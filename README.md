# Inventory Management System

This is a sample inventory management system built with Express.js and Apollo Server, leveraging Hasura GraphQL for data storage and retrieval.

## Getting Started

### Prerequisites

- Node.js: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/inventory-management-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd inventory-management-system
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Update the `.env` file with your Hasura GraphQL endpoint and admin secret.

   ```env
   HASURA_GRAPHQL_ENDPOINT=YOUR_HASURA_GRAPHQL_ENDPOINT
   HASURA_ADMIN_SECRET=YOUR_HASURA_ADMIN_SECRET
   ```

### Usage

1. Start the server:

   ```bash
   npm start
   ```

   The server will be running at `http://localhost:3000`.

2. Access the GraphQL Playground to interact with the API by navigating to `http://localhost:3000/graphql` in your browser.

## GraphQL Operations

### Queries

- `products`: Get a list of all products.
- `product(id: String!)`: Get details of a specific product by ID.
- `variants`: Get a list of all variants.
- `variant(id: String!)`: Get details of a specific variant by ID.

### Mutations

- `createProduct(product_name: String!, totalstock: Int!, variant_id: String!): Product`: Create a new product.
- `updateProduct(product_id: String!, product_name: String, totalstock: Int, variant_id: String): Product`: Update an existing product.
- `deleteProduct(product_id: String!): String`: Delete a product by ID.

- `createVariant(price: Float!, description: String!, seller_id: String!): Variant`: Create a new variant.
- `updateVariant(variant_id: String!, price: Float, description: String, seller_id: String): Variant`: Update an existing variant.
- `deleteVariant(variant_id: String!): String`: Delete a variant by ID.

- `buyProduct(product_id: String!, quantity: Int!): Product`: Decrease the quantity of a product when a buyer makes a purchase.

