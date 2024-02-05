import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CheckPassword, HashedPassword } from '../utils/helpers';
import { Prisma } from '@prisma/client';
import { UserCreateT } from '../types/user';

interface AuthBodyI extends FastifyRequest {
  body: UserCreateT;
}

export async function SignUp(this: FastifyInstance, request: AuthBodyI, reply: FastifyReply) {
  try {
    const { email, password } = request.body;

    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (user) {
      reply.code(409).send(new Error('User Already Exists'));
    }

    const hashPass = HashedPassword(password);
    const data: Prisma.UserCreateInput = {
      email,
      password: hashPass
    };
    const createUser = await this.prisma.user.create({
      data
    });

    const token = this.jwt.sign({ payload: { user_id: createUser.id } });
    return { token };
  } catch (err) {
    throw err;
  }
}

export async function Login(this: FastifyInstance, request: AuthBodyI, reply: FastifyReply) {
  try {
    const { email, password } = request.body;

    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      reply.code(400).send(new Error('User Does Not Exist'));
      return;
    }

    const checkPass = CheckPassword(password, user.password);
    if (!checkPass) {
      reply.code(400).send(new Error('Invalid Credentials'));
    }

    const token = this.jwt.sign({ payload: { user_id: user.id } });
    return { token };
  } catch (err) {
    throw err;
  }
}
