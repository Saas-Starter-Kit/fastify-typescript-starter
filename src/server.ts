import app from './app';

const server = app();

const port = Number(process.env.PORT) || 4000;

server.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
