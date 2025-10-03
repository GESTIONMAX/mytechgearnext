import { gql } from '@apollo/client';

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: Int!, $quantity: Int = 1, $variationId: Int) {
    addToCart(input: { productId: $productId, quantity: $quantity, variationId: $variationId }) {
      cartItem {
        key
        product {
          node {
            id
            name
            slug
            image {
              sourceUrl
              altText
            }
          }
        }
        quantity
        total
        subtotal
      }
    }
  }
`;

export const GET_CART = gql`
  query GetCart {
    cart {
      contents {
        nodes {
          key
          product {
            node {
              id
              name
              slug
              image {
                sourceUrl
                altText
              }
            }
          }
          quantity
          total
          subtotal
        }
      }
      total
      subtotal
      needsShippingAddress
      availableShippingMethods {
        packageDetails
        rates {
          id
          label
          cost
        }
      }
    }
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($key: ID!, $quantity: Int!) {
    updateItemQuantities(input: { items: [{ key: $key, quantity: $quantity }] }) {
      cart {
        contents {
          nodes {
            key
            quantity
            total
          }
        }
      }
    }
  }
`;

export const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($key: ID!) {
    removeItemsFromCart(input: { keys: [$key] }) {
      cart {
        contents {
          nodes {
            key
          }
        }
      }
    }
  }
`;
