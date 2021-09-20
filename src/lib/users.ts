import { gql } from '@urql/core';

import { User } from '../types/graphql';
import { QueryResponse } from '../types/query';

import { APIClient } from './client';

export class UsersHandler {
  private client: APIClient;

  constructor(client: APIClient) {
    this.client = client;
  }

  sayHi(): string {
    return 'Hi!';
  }

  async register(
    email: string,
    password: string,
    name: string
  ): Promise<QueryResponse<User>> {
    const mutation = gql`
      mutation createUser($input: CreateUserInput!) {
        createUser(createUserInput: $input) {
          id
          name
          email
          avatar
          createdAt
        }
      }
    `;
    const result = await this.client
      .mutate(mutation, {
        input: {
          email,
          name,
          password
        }
      })
      .toPromise();

    return {
      data: result.data,
      error: result.error
    };
  }
}
