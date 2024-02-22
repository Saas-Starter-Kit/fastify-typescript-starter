import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CheckPassword, HashedPassword } from '../utils/helpers';
import { user } from '../types/user';
import { users } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { db } from '../drizzle/db';

interface AuthBodyI extends FastifyRequest {
  body: user;
}

export async function SignUp(this: FastifyInstance, request: AuthBodyI, reply: FastifyReply) {
  try {
    const { email, password } = request.body;

    const user = await db.select().from(users).where(eq(users.email, email));

    if (user[0]) {
      reply.code(409).send(new Error('User Already Exists'));
    }

    const hashPass = HashedPassword(password);
    const data: user = {
      email,
      password: hashPass
    };

    const createUser = await db.insert(users).values(data).returning({ id: users.id });

    const token = this.jwt.sign({ payload: { user_id: createUser[0].id } });
    return { token };
  } catch (err) {
    throw err;
  }
}

export async function Login(this: FastifyInstance, request: AuthBodyI, reply: FastifyReply) {
  try {
    const { email, password } = request.body;

    const user = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      reply.code(400).send(new Error('User Does Not Exist'));
      return;
    }

    const checkPass = CheckPassword(password, user[0].password);
    if (!checkPass) {
      reply.code(400).send(new Error('Invalid Credentials'));
    }

    const token = this.jwt.sign({ payload: { user_id: user[0].id } });
    return { token };
  } catch (err) {
    throw err;
  }
}
