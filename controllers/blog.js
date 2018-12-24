/* eslint linebreak-style: ["error", "windows"] */
import queryblog from '../database/blogquery';

export default class Post {
  // query all posts from the database
  static getAllPosts(req, res, next) {
    queryblog
      .getAll()
      .then((posts) => {
        res.status(200).json({
          message: 'all posts',
          posts,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  // query one post from the database
  static getOnePost(req, res, next) {
    queryblog
      .getOne(req.params.id)
      .then((post) => {
        res.status(200).json({
          post,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  // publish a new post by setting publish property to true
  static publishPost(req, res, next) {
    const updatedPost = {
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      publish: true,
      unpublish: false,
    };
    queryblog
      .publish(req.params.id, updatedPost)
      .then(() => queryblog.getOne(req.params.id))
      .then(post => res.status(200).json(post))
      .catch((error) => {
        next(error);
      });
  }

  // publish a new post by setting publish property to true
  static unpublishPost(req, res, next) {
    const updatedPost = {
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      publish: false,
      unpublish: true,
    };
    queryblog
      .publish(req.params.id, updatedPost)
      .then(() => queryblog.getOne(req.params.id))
      .then(post => res.status(200).json(post))
      .catch((error) => {
        next(error);
      });
  }

  static createPost(req, res, next) {
    queryblog
      .create(req.body)
      .then(blogId => queryblog.getOne(blogId)) // check db to see if its created
      .then(post => res.status(200).json(post)) // then we return it
      .catch((error) => {
        if (error.routine === '_bt_check_unique') {
          return res.json({
            message: 'the same question has been asked',
          });
        }
        return next(error);
      });
  }

  static deleteBlogPost(req, res, next) {
    queryblog
      .getOne(req.params.id)
      .then((post) => {
        queryblog
          .deletePost(req.params.id)
          .then(() => res.status(200).json({
            message: 'Post deleted',
            post,
          }))
          .catch((error) => {
            res.json(error);
          });
      })
      .catch((error) => {
        res.json(error);
        next(error);
      });
  }
}
