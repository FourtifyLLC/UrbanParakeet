/* eslint-disable import/no-anonymous-default-export */
export default async (req, res) => {
  if (!req.query.todo) {
    return res.status(400).send('todo parameter required.');
  }
  let todo = encodeURI(req.query.todo);

  const token =
    'AYvEACQgODQ3NGUyZDMtZjNmMy00OGM3LWI5NzItNDU5ZDhlMmRmYWUyMjBhZjkwMTE5MzI2NDMxY2E2NDIzOTlmNDRjYTYxOTY=';
  const url =
    'https://us1-boss-grouper-35780.upstash.io/lpush/todo/' +
    todo +
    '?_token=' +
    token;

  return fetch(url)
    .then((r) => r.json())
    .then((data) => {
      let result = JSON.stringify(data.result);
      return res.status(200).json(result);
    });
};
