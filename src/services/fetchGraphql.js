import UserService from "./UserService";

async function fetchGraphql(text, variables) {
  const response = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UserService.getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });
  UserService.updateToken();
  return await response.json();
}
export default fetchGraphql;
