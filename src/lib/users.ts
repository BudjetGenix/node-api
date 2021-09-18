import { gql } from '@urql/core';

import { APIClient } from './client';

export class UsersHandler {
  private client: APIClient;

  constructor(client: APIClient) {
    this.client = client;
  }

  sayHi(): string {
    return 'Hi!';
  }

  async register(email: string, password: string, name: string) {
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
          password,
        },
      })
      .toPromise();

    return result;
  }
}
