import { type DocumentNode, print } from 'graphql';

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

const fetchGraphQL = async <T>(gqlQuery: DocumentNode): Promise<T> => {
  const query = print(gqlQuery);
  const response = await fetch(`${process.env.BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors) {
    console.error('GraphQL errors:', result.errors);
    throw new Error('Failed to fetch the data from GraphQL');
  }

  if (!result.data) {
    throw new Error('No data returned from GraphQL');
  }

  return result.data;
};

export default fetchGraphQL;
