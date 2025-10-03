import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL,
  fetch: (uri, options) => {
    return fetch(uri, {
      ...options,
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
      },
    });
  },
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Product: {
          fields: {
            variations: {
              merge: false,
            },
          },
        },
      },
    }),
    link: httpLink,
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
    },
  });
});
