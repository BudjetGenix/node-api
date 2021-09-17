import { ApolloClient, ApolloClientOptions, ApolloQueryResult, DocumentNode, gql, NormalizedCacheObject } from "@apollo/client";

export class Client {
    apolloClient: ApolloClient<NormalizedCacheObject>

    constructor(options: ApolloClientOptions<NormalizedCacheObject>) {
        this.apolloClient = new ApolloClient(options)
    }

    query<T>(query: DocumentNode): Promise<ApolloQueryResult<T>> {
        return this.apolloClient.query<T>({
            query
        })
    }

    users() {

    }
}
