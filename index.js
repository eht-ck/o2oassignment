const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const fetch = require('cross-fetch');

const app = express();
const port = 3000;

const typeDefs = gql`
  type Product {
    product_id: String!
    product_name: String!
    totalstock: Int!
    variant_id: String!
  }

  type Variant {
    variant_id: String!
    price: Float!
    description: String!
    seller_id: String!
  }

  type Query {
    products: [Product]
    product(id: String!): Product
    variants: [Variant]
    variant(id: String!): Variant
  }

  type Mutation {
    createProduct(product_name: String!, totalstock: Int!, variant_id: String!): Product
    updateProduct(product_id: String!, product_name: String, totalstock: Int, variant_id: String): Product
    deleteProduct(product_id: String!): String

    createVariant(price: Float!, description: String!, seller_id: String!): Variant
    updateVariant(variant_id: String!, price: Float, description: String, seller_id: String): Variant
    deleteVariant(variant_id: String!): String

    buyProduct(product_id: String!, quantity: Int!): Product
  }
`;

// GraphQL Resolvers
const resolvers = {
  Query: {
    products: async () => {
      const response = await fetch('YOUR_HASURA_GRAPHQL_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'YOUR_HASURA_ADMIN_SECRET' },
        body: JSON.stringify({ query: '{ products { product_id, product_name, totalstock, variant_id } }' }),
      });
      const data = await response.json();
      return data.data.products;
    },
    product: async (_, { id }) => {
      const response = await fetch('YOUR_HASURA_GRAPHQL_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'YOUR_HASURA_ADMIN_SECRET' },
        body: JSON.stringify({ query: `query($id: String!) { product(id: $id) { product_id, product_name, totalstock, variant_id } }`, variables: { id } }),
      });
      const data = await response.json();
      return data.data.product;
    },
    variants: async () => {
      const response = await fetch('YOUR_HASURA_GRAPHQL_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'YOUR_HASURA_ADMIN_SECRET' },
        body: JSON.stringify({ query: '{ variants { variant_id, price, description, seller_id } }' }),
      });
      const data = await response.json();
      return data.data.variants;
    },
    variant: async (_, { id }) => {
      const response = await fetch('YOUR_HASURA_GRAPHQL_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'YOUR_HASURA_ADMIN_SECRET' },
        body: JSON.stringify({ query: `query($id: String!) { variant(id: $id) { variant_id, price, description, seller_id } }`, variables: { id } }),
      });
      const data = await response.json();
      return data.data.variant;
    },
  },
  Mutation: {
    createProduct: async (_, { product_name, totalstock, variant_id }) => {
      const response = await fetch('YOUR_HASURA_GRAPHQL_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'YOUR_HASURA_ADMIN_SECRET' },
        body: JSON.stringify({
          query: `mutation($product_name: String!, $totalstock: Int!, $variant_id: String!) { createProduct(product_name: $product_name, totalstock: $totalstock, variant_id: $variant_id) { product_id, product_name, totalstock, variant_id } }`,
          variables: { product_name, totalstock, variant_id },
        }),
      });
      const data = await response.json();
      return data.data.createProduct;
    },
    updateProduct: async (_, { product_id, product_name, totalstock, variant_id }) => {
      const response = await fetch('YOUR_HASURA_GRAPHQL_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'YOUR_HASURA_ADMIN_SECRET' },
        body: JSON.stringify({
          query: `mutation($product_id: String!, $product_name: String, $totalstock: Int, $variant_id: String) { updateProduct(product_id: $product_id, product_name: $product_name, totalstock: $totalstock, variant_id: $variant_id) { product_id, product_name, totalstock, variant_id } }`,
          variables: { product_id, product_name, totalstock, variant_id },
        }),
      });
      const data = await response.json();
      return data.data.updateProduct;
    },
    deleteProduct: async (_, { product_id }) => {
      const response = await fetch('YOUR_HASURA_GRAPHQL_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'YOUR_HASURA_ADMIN_SECRET' },
        body: JSON.stringify({
          query: `mutation($product_id: String!) { deleteProduct(product_id: $product_id) }`,
          variables: { product_id },
        }),
      });
      const data = await response.json();
      return data.data.deleteProduct;
    },
    createVariant: async (_, { price, description, seller_id }) => {
      const response = await fetch('YOUR_HASURA_GRAPHQL_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'YOUR_HASURA_ADMIN_SECRET' },
        body: JSON.stringify({
          query: `mutation($price: Float!, $description: String!, $seller_id: String!) { createVariant(price: $price, description: $description, seller_id: $seller_id) { variant_id, price, description, seller_id } }`,
          variables: { price, description, seller_id },
        }),
      });
      const data = await response.json();
      return data.data.createVariant;
    },
    updateVariant: async (_, { variant_id, price, description, seller_id }) => {
      const response = await fetch('YOUR_HASURA_GRAPHQL_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'YOUR_HASURA_ADMIN_SECRET' },
        body: JSON.stringify({
          query: `mutation($variant_id: String!, $price: Float, $description: String, $seller_id: String) { updateVariant(variant_id: $variant_id, price: $price, description: $description, seller_id: $seller_id) { variant_id, price, description, seller_id } }`,
          variables: { variant_id, price, description, seller_id },
        }),
      });
      const data = await response.json();
      return data.data.updateVariant;
    },
    deleteVariant: async (_, { variant_id }) => {
      const response = await fetch('YOUR_HASURA_GRAPHQL_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'YOUR_HASURA_ADMIN_SECRET' },
        body: JSON.stringify({
          query: `mutation($variant_id: String!) { deleteVariant(variant_id: $variant_id) }`,
          variables: { variant_id },
        }),
      });
      const data = await response.json();
      return data.data.deleteVariant;
    },
    buyProduct: async (_, { product_id, quantity }) => {
      const response = await fetch('YOUR_HASURA_GRAPHQL_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': 'YOUR_HASURA_ADMIN_SECRET' },
        body: JSON.stringify({
          query: `mutation($product_id: String!, $quantity: Int!) { buyProduct(product_id: $product_id, quantity: $quantity) { product_id, product_name, totalstock, variant_id } }`,
          variables: { product_id, quantity },
        }),
      });
      const data = await response.json();
      return data.data.buyProduct;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
