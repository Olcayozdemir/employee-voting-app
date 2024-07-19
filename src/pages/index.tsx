import { gql, useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const GET_EMPLOYEES = gql`
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
`;

const VOTE_EMPLOYEE = gql`
  mutation VoteEmployee($id: ID!) {
    voteEmployee(id: $id) {
      id
      votes
    }
  }
`;

const EmployeeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const Row = styled.div`
  width: 35%;
  display: flex;
  align-items: center;
`;

const EmployeeCard = styled.div`
  width: 100%;
  margin: 10px;
  padding: 10px 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  width: 90px;
  padding: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  background-color: #8ff023;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const SytledLink = styled(Link)`
  text-decoration: none;
  color: black;
  width: 90px;
  padding: 10px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  cursor: pointer;
`;

const SytledImage = styled(Image)`
  border-radius: 50%;
  margin-right: 20px;
`;

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  votes: number;
  imageUrl: string;
}

export default function Home() {
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES);
  const [voteEmployee] = useMutation(VOTE_EMPLOYEE, {
    onCompleted: () => {
      refetch();
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleVote = (id: string) => {
    voteEmployee({ variables: { id } });
  };

  return (
    <EmployeeList>
      {data.employees
        .slice()
        .sort((a: Employee, b: Employee) => b.votes - a.votes)
        .map((employee: Employee) => (
          <EmployeeCard key={employee.id}>
            <Row>
              <SytledImage
                src={employee.imageUrl}
                alt={`${employee.firstName} ${employee.lastName}`}
                width={80}
                height={80}
              />
              <Column>
                <h3>
                  {employee.firstName} {employee.lastName}
                </h3>
                <p>{employee.role}</p>
              </Column>
            </Row>
            <p>Votes: {employee.votes}</p>
            <div>
              <Button onClick={() => handleVote(employee.id)}>Vote</Button>
              <SytledLink href={`/employee/${employee.id}`}>
                <p>Details</p>
              </SytledLink>
            </div>
          </EmployeeCard>
        ))}
    </EmployeeList>
  );
}
