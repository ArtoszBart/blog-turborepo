import { GraphQLFormattedError } from 'graphql';

type ResponseError = {
  code: string;
  stackTrace: string[];
  originalError: {
    message: string;
    error: string;
    statusCode: number;
  };
};

export type GraphQLResponse<T> = {
  data?: T;
  errors?: (GraphQLFormattedError & { extensions: ResponseError })[];
};
