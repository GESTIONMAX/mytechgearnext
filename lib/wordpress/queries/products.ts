import { gql } from '@apollo/client';

// Query pour récupérer tous les produits avec pagination
export const GET_PRODUCTS = gql`
  query GetProducts($first: Int, $after: String, $search: String, $categoryId: ID) {
    products(
      first: $first
      after: $after
      where: { search: $search, categoryId: $categoryId, status: PUBLISH, stockStatus: IN_STOCK }
    ) {
      nodes {
        id
        databaseId
        name
        slug
        description
        shortDescription
        price
        salePrice
        stockStatus
        stockQuantity
        image {
          sourceUrl
          altText
        }
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        attributes {
          nodes {
            name
            options
          }
        }
        variations {
          nodes {
            id
            name
            price
            salePrice
            stockStatus
            attributes {
              nodes {
                name
                value
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

// Query pour récupérer un produit par slug
export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      description
      shortDescription
      price
      salePrice
      stockStatus
      stockQuantity
      image {
        sourceUrl
        altText
      }
      galleryImages {
        nodes {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      attributes {
        nodes {
          name
          options
        }
      }
      variations {
        nodes {
          id
          name
          price
          salePrice
          stockStatus
          attributes {
            nodes {
              name
              value
            }
          }
        }
      }
      related {
        nodes {
          id
          databaseId
          name
          slug
          price
          salePrice
          image {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

// Query pour récupérer les catégories
export const GET_CATEGORIES = gql`
  query GetCategories {
    productCategories {
      nodes {
        id
        name
        slug
        description
        image {
          sourceUrl
          altText
        }
        count
      }
    }
  }
`;

// Query pour récupérer les produits d'une catégorie
export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($categorySlug: String!, $first: Int, $after: String) {
    products(first: $first, after: $after, where: { category: $categorySlug, status: PUBLISH, stockStatus: IN_STOCK }) {
      nodes {
        id
        databaseId
        name
        slug
        description
        shortDescription
        price
        salePrice
        stockStatus
        image {
          sourceUrl
          altText
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
