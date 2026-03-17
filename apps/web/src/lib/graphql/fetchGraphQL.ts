import { type DocumentNode, print } from 'graphql';
import { convertStringsToDates } from '../dateTime/converters';
import { getSession } from '../session';
import { GraphQLResponse } from './types/gqlResponse';

const fetchGraphQL = async <ResponseDTO, RequestDTO = undefined>(
  gqlQuery: DocumentNode,
  payload?: RequestDTO,
  headers?: object,
): Promise<GraphQLResponse<ResponseDTO>> => {
  const query = print(gqlQuery);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify({ query, variables: { payload: payload } }),
    },
  );

  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }

  const result: GraphQLResponse<ResponseDTO> = await response.json();

  if (result.errors) {
    const status = result.errors[0].extensions?.originalError?.statusCode;
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

  convertStringsToDates(result.data);
  return result;
};

export const authFetchGraphQL = async <ResponseDTO, RequestDTO = undefined>(
  gqlQuery: DocumentNode,
  payload?: RequestDTO,
) => {
  const session = await getSession();

  return fetchGraphQL<ResponseDTO, RequestDTO>(gqlQuery, payload, {
    Authorization: `Bearer ${session?.accessToken}`,
  });
};

export default fetchGraphQL;
