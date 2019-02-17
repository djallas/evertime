import Joi from 'joi';
/* eslint linebreak-style: ["error", "windows"] */
import querytask from '../database/querytask';

export default class Task {
  // query all posts from the database
  static getAllTasks(req, res) {
    querytask.getAll().then((task) => {
      res.render('posts', { task: task, user: req.user});      
    });
  }

  // create post
  static createTask(req, res) {
    const task = {
      task: req.body.task,
      time: req.body.time
    }
    querytask
      .create(task)
      .then((task) => res.status(200).send(
        {
          error:false,
          id:task[0].id,
          task:task[0].task,
          time:task[0].time,
          message: "Time created successfully"
        }
      )  
      )    
      .catch((error) => {
        res.status(301).send({
          error:true,
          id: task.id,
          message:err,
        })
      });
  }
}

function varidateTask(task){
  const schema = {
    task: Joi.string().required(),
    time: Joi.string().required()
  };
  return Joi.validate(post, schema);
}
