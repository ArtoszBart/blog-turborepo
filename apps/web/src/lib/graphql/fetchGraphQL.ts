import { type DocumentNode, GraphQLFormattedError, print } from 'graphql';

type GraphQLResponse<T> = {
  data?: T;
  errors?: GraphQLFormattedError[];
};

const fetchGraphQL = async <T>(
  gqlQuery: DocumentNode,
  variables = {}
): Promise<GraphQLResponse<T>> => {
  const query = print(gqlQuery);
  const response = await fetch(`${process.env.BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors) {
    if (result.errors[0].extensions?.status === 409) {
      return result;
    }

    console.error('GraphQL errors:', result.errors);
    throw new Error('Failed to fetch the data from GraphQL');
  }

  if (!result.data) {
    throw new Error('No data returned from GraphQL');
  }

  return result;
};

export default fetchGraphQL;
