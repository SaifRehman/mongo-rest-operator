import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { TodoController } from "../listing/lib/controllers/crmController";
import "reflect-metadata";
class ListingMongoController {
  public todoController: TodoController = new TodoController();
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.get("/healthz", (_, res) => {
      res.status(200).send("ok");
    });

    this.router.get(
      "/"+process.env.ENDPOINT,
      (req: Request, res: Response, next: NextFunction) => {
        next();
      },
      this.todoController.getTodo
    );

    this.router.post(
      "/"+process.env.ENDPOINT,
      (req: Request, res: Response, next: NextFunction) => {
        next();
      },
      this.todoController.addNewTodo
    );

    this.router.post(
      "/"+process.env.ENDPOINT,
      (req: Request, res: Response, next: NextFunction) => {
        next();
      },
      this.todoController.searchTodo
    );

    this.router.get(
      "/"+process.env.ENDPOINT+"/:ID",
      (_, res: Response, next: NextFunction) => {
        next();
      },
      this.todoController.getTodoById
    );

    this.router.put(
      "/"+process.env.ENDPOINT+"/:ID",
      (_, res: Response, next: NextFunction) => {
        next();
      },
      this.todoController.updateTodo
    );

    this.router.delete(
      "/"+process.env.ENDPOINT+"/:ID",
      (_, res: Response, next: NextFunction) => {
        next();
      },
      this.todoController.deleteTodo
    );
  }
}

export default new ListingMongoController().router;
