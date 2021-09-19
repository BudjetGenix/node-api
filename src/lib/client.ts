import 'isomorphic-unfetch';

import {
  Client,
  createClient,
  defaultExchanges,
  OperationResult,
  PromisifiedSource
} from '@urql/core';
import { DocumentNode } from 'graphql';

import { UsersHandler } from './users';

export class APIClient {
  private client: Client;
  private usersHandler: UsersHandler;

  /**
   * ### Example (es imports)
   * ```js
   * import { Client } from "@budjetgenix/api"
   * const instance = new Client({url: "https://api.budjetgenix.com"})
   * ```
   *
   * ### Example (commonjs)
   * ```js
   * var Client = require('@budjetgenix/api').Client
   * var instance = new Client({url: "https://api.budjetgenix.com"})
   * ```
   * @param {ClientOptions} options
   */
  constructor(options: { url: string }) {
    this.client = createClient({
      url: options.url,
      exchanges: defaultExchanges
    });
    this.usersHandler = new UsersHandler(this);
  }

  /**
   * A function to query anything from the api
   *
   * ### Example
   * ```js
   * const result = await #.query(`
   *  query {
   *    me {
   *      name
   *    }
   *  }
   * `)
   * console.log(result)
   * // => ?????
   * ```
   *
   * ### Example (with variables)
   * ```js
   * const result = await #.query(`
   *  query GetUser($id: ID!) {
   *    getUser(id: $id) {
   *      name
   *    }
   *  }
   * `, {
   *  id: '1'
   * })
   *
   * console.log(result)
   * // => ??????
   * ```
   * @param {DocumentNode} query
   * @param {Object} variables
   */
  query(
    query: DocumentNode,
    variables?: {}
  ): PromisifiedSource<OperationResult<any, {}>> {
    return this.client.query(query, variables);
  }

  mutate(
    mutation: DocumentNode,
    variables?: {}
  ): PromisifiedSource<OperationResult<any, {}>> {
    return this.client.mutation(mutation, variables);
  }

  users() {
    return this.usersHandler;
  }
}
