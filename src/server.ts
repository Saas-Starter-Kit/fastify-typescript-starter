import { build } from './app';

const server = build();

const port = Number(process.env.PORT) || 4000;

export default function start() {
  server.listen({ port }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

start();
