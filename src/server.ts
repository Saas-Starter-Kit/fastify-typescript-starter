import { build } from './app';

const server = build();

const port = Number(process.env.PORT) || 80;
const host = process.env.HOST || '0.0.0.0';

export default function start() {
  server.listen({ port, host }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

start();
