import { Server } from "./server";

function main() {
  try {
    const server = new Server();
    server.start();

  } catch (error) {
    console.error("An error occurred startint application: ", error);
  }
}

main();