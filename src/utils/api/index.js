import config from "/config";

const { baseUrl } = config?.endpoints;
const { uri } = config?.endpoints?.graphql;
const endpoint = `${baseUrl()}${uri}`;

export const postGraphQLRequest = (query, operationName, variables = {}) => {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization:
        "SNI1-JWT-SHA256 Application=development JWT=eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODUyNTYzMzksImRldiI6dHJ1ZSwiZ2lneWFfdWlkIjoiMTIzIn0.xFyZ5iPiLGauB_-SSb912jWJeqcTDT6cgg5H98CAhhw",
    },
    body: JSON.stringify({
      query,
      variables: {
        ...variables,
      },
      operationName,
    }),
  })
    .then((response) => response.json())
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
};
