import { type DocumentNode, print } from 'graphql';
import { GraphQLResponse } from './types/gqlResponse';

const fetchGraphQL = async <T>(
  gqlQuery: DocumentNode,
  variables = {}
): Promise<GraphQLResponse<T>> => {
  const query = print(gqlQuery);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    }
  );

  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors) {
    const status = result.errors[0].extensions?.originalError.statusCode;
    const knownErrors = [400, 409];

    if (status && knownErrors.includes(status)) {
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
