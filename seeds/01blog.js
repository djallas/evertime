
exports.seed = (knex, Promise) => knex('blog')
  .del() // Deletes ALL existing entries
  .then(() => knex('blog').insert({
    title: 'what is es6?',
    content: 'Lorem Ipsum is simply dummy',
    publish: true,
    unpublish: false,
  }))
  .then(() => knex('blog').insert({
    title: 'what is javascript?',
    content: 'Lorem Ipsum is simply dummy',
    publish: false,
    unpublish: true,
  }))
  .then(() => knex('blog').insert({
    title: 'what is nodejs?',
    content: 'Lorem Ipsum is simply dummy',
    publish: true,
    unpublish: false,
  }))
  .then(() => knex('blog').insert({
    title: 'what is TDD?',
    content: 'Lorem Ipsum is simply dummy',
    publish: false,
    unpublish: true,
  }));
