import config from "/config";

const { baseUrl } = config?.endpoints;
const { uri } = config?.endpoints?.graphql;
const endpoint = `${baseUrl()}${uri}`;

export const postGraphQLRequest = (
  query,
  operationName,
  variables = {},
  setEntitlement = () => {}
) => {
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
    .then((response) => {
      const { headers } = response;
      const xEntitlement = headers.get("x-entitlement");
      const isEntitled =
        ["food-network-plus", "food-network-kitchen"].indexOf(xEntitlement) >
        -1;
      setEntitlement(isEntitled);
      return response.json();
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
};
