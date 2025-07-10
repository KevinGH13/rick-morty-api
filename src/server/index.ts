import express, { Application } from "express";
import { createHandler } from "graphql-http";

export class Server {
  private app: Application;
  private PORT: number | string;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3000;
  }

  public start(): void {
    // Conectar a la base de datos
    // const db = DatabaseConnection.getInstance();
    // await db.connect();


    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.get("/health", (req, res) => {
      res.json({ status: "Server is running", timestamp: new Date().toISOString() });
    });

    this.app.all("/graphql", createHandler({}));

    this.app.listen(this.PORT, () => {
      console.log(`Server is running on http://localhost:${this.PORT}`);
    });
  }
}