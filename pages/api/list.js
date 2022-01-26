/* eslint-disable import/no-anonymous-default-export */
export default async (req, res) => {
  const token =
    'AYvEACQgODQ3NGUyZDMtZjNmMy00OGM3LWI5NzItNDU5ZDhlMmRmYWUyMjBhZjkwMTE5MzI2NDMxY2E2NDIzOTlmNDRjYTYxOTY=';
  const url =
    'https://us1-boss-grouper-35780.upstash.io/lrange/todo/0/100?_token=' +
    token;

  return fetch(url)
    .then((r) => r.json())
    .then((data) => {
      let result = JSON.stringify(data.result);
      return res.status(200).json(result);
    });
};
