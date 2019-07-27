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
      "/listTodo",
      (req: Request, res: Response, next: NextFunction) => {
        next();
      },
      this.todoController.getTodo
    );

    this.router.post(
      "/listTodo",
      (req: Request, res: Response, next: NextFunction) => {
        next();
      },
      this.todoController.addNewTodo
    );

    this.router.post(
      "/searchTodo",
      (req: Request, res: Response, next: NextFunction) => {
        next();
      },
      this.todoController.searchTodo
    );

    this.router.get(
      "/listTodo/:ID",
      (_, res: Response, next: NextFunction) => {
        next();
      },
      this.todoController.getTodoById
    );

    this.router.put(
      "/listTodo/:ID",
      (_, res: Response, next: NextFunction) => {
        next();
      },
      this.todoController.updateTodo
    );

    this.router.delete(
      "/listTodo/:ID",
      (_, res: Response, next: NextFunction) => {
        next();
      },
      this.todoController.deleteTodo
    );
  }
}

export default new ListingMongoController().router;
