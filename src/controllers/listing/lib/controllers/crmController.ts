import * as mongoose from "mongoose";
import { TodoSchema } from "../models/crmModel";
import { Request, Response } from "express";

const Todo = mongoose.model("Todo", TodoSchema);
export class TodoController {
  public addNewTodo(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    let newTodo = new Todo(req.body);
    newTodo.save((err, todo) => {
      if (err) {
        res.status(404).json({ err });
        return;
      }
      res.json(todo);
    });
  }
  public getTodo(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    Todo.find({}, (err, todo) => {
      if (err) {
        res.status(404).json({ err });
        return;
      } else {
        res.status(200).send(todo);
      }
    });
  }
  public searchTodo(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    let query = {
      $and:[{
        'Username': req.body.Username,
      }]
    };
    Todo.find( query , (err, todo) => {
      if (err) {
        res.status(404).json({ err });
        return;
      } else {
        res.status(200).send(todo);
      }
    });
  }
  public getTodoById(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    Todo.findById(req.params.ID, (err, todo) => {
      if (err) {
        res.status(404).json({ err });
        return;
      } else {
        res.status(200).send(todo);
      }
    });
  }
  public updateTodo(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    Todo.findOneAndUpdate(
      { _id: req.params.ID },
      req.body,
      { new: true },
      (err, todo) => {
        if (err) {
          res.status(404).json({ err });
          return;
        }
        res.json(todo);
      }
    );
  }

  public deleteTodo(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    Todo.deleteOne({ _id: req.params.ID }, err => {
      if (err) {
        res.status(404).json({ err });
        return;
      }
      res.json({ message: "success" });
    });
  }
}
