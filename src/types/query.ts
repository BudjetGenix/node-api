import { CombinedError } from '@urql/core';

export interface QueryResponse<T> {
  data?: T;
  error?: CombinedError | undefined;
}
