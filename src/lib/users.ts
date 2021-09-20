import { gql } from '@urql/core';

import { TokenResponse, User } from '../types/graphql';
import { QueryResponse } from '../types/query';

import { APIClient } from './client';

export class UsersHandler {
  private client: APIClient;
  private tokens: TokenResponse;

  constructor(client: APIClient, tokens: TokenResponse) {
    this.client = client;
    this.tokens = tokens;
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

  async login(
    password?: string,
    email?: string,
    name?: string
  ): Promise<boolean> {
    const query = gql`
      query login($email: String, $name: String, $password: String!) {
        login(
          loginUserInput: { email: $email, password: $password, name: $name }
        ) {
          tokens {
            accessToken
            refreshToken
          }
        }
      }
    `;

    const res = await this.client
      .query(query, { email, name, password })
      .toPromise();

    if (res.error) {
      return false;
    }

    this.tokens = res.data.login.tokens;

    return true;
  }

  async loginWith(
    type: 'github' | 'refreshToken'
  ): Promise<{ githubUrl?: string; success: boolean; error?: any }> {
    let query;
    let res;
    switch (type) {
      case 'github':
        query = gql`
          query {
            loginWithThirdParty(thirdPartyLogin: { type: "github" })
          }
        `;

        res = await this.client.query(query).toPromise();

        if (res.data) {
          return {
            githubUrl: res.data.loginWithThirdParty,
            success: true
          };
        }

        return { githubUrl: '', success: false };
      case 'refreshToken':
        query = gql`
          mutation refresh($token: String!) {
            loginWithRefreshToken(refreshToken: $token) {
              tokens {
                accessToken
                refreshToken
              }
            }
          }
        `;

        res = await this.client
          .mutate(query, { token: this.tokens.refreshToken || '' })
          .toPromise();

        if (res.error) return { success: false, error: res.error };

        this.tokens.accessToken =
          res.data.loginWithRefreshToken.tokens.accessToken;
        this.tokens.refreshToken =
          res.data.loginWithRefreshToken.tokens.refreshToken;

        return { success: true };

      default:
        return {
          githubUrl: '',
          success: false
        };
    }
  }
}
