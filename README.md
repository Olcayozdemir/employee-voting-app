# Employee Voting App

Employee Voting App is a single-page application (SPA) built with Next.js, Apollo Client, and Apollo Server. It allows users to vote for their favorite employee. The votes are stored in-memory and the app supports voting for multiple employees with real-time updates.

## Features

- List all employees with their details and a voting button
- Vote for an employee
- View detailed information about each employee
- Real-time updates for votes
- Single Page Application (SPA) with client-side navigation
- Server-Side Rendering (SSR) with Next.js

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL](https://graphql.org/)
- [Styled Components](https://styled-components.com/)
- [UUID](https://github.com/uuidjs/uuid)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/employee-voting-app.git
    cd employee-voting-app
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the Apollo Server:**

    ```bash
    npm run server
    ```

4. **Run the Next.js development server:**

    ```bash
    npm run dev
    ```

5. **Open your browser and visit:**

    ```plaintext
    http://localhost:3000
    ```

## GraphQL Endpoints

- **Query Employees:**

    ```graphql
    query GetEmployees {
      employees {
        id
        firstName
        lastName
        role
        votes
        imageUrl
      }
    }
    ```

- **Query Employee by ID:**

    ```graphql
    query GetEmployee($id: ID!) {
      employee(id: $id) {
        id
        firstName
        lastName
        role
        email
        address
        phone
        imageUrl
      }
    }
    ```

- **Vote for Employee:**

    ```graphql
    mutation VoteEmployee($id: ID!) {
      voteEmployee(id: $id) {
        id
        votes
      }
    }
    ```

## Project Structure

```plaintext
employee-voting-app/
├── public/
│   └── ...
├── src/
│   ├── components/
│   │   └── ...
│   ├── lib/
│   │   └── apolloClient.ts
│   ├── pages/
│   │   ├── employee/
│   │   │   └── [id].tsx
│   │   ├── _app.tsx
│   │   └── index.tsx
│   └── styles/
│       └── globals.css
├── server.ts
├── package.json
├── tsconfig.json
└── README.md
