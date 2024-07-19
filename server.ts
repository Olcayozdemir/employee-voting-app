import { ApolloServer, gql } from "apollo-server";
import { employees } from "./mockData";

const typeDefs = gql`
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    role: String!
    votes: Int!
    email: String!
    address: String!
    phone: String!
    imageUrl: String!
  }

  type Query {
    employees: [Employee!]!
    employee(id: ID!): Employee
  }

  type Mutation {
    voteEmployee(id: ID!): Employee
  }
`;

const resolvers = {
  Query: {
    employees: () => employees,
    employee: (_: any, { id }: { id: string }) => {
      return employees.find((emp) => emp.id === id);
    },
  },
  Mutation: {
    voteEmployee: (_: any, { id }: { id: string }) => {
      const employee = employees.find((emp) => emp.id === id);
      if (employee) {
        employee.votes += 1;
        console.log(
          `Employee ${employee.firstName} ${employee.lastName} now has ${employee.votes} votes.`
        );
      }
      return employee;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
