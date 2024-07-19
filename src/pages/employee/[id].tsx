import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Image from "next/image";

const GET_EMPLOYEE = gql`
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
`;

const EmployeeDetail = styled.div`
  text-align: center;
  margin: 5% 20%;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 500px;
  @media only screen and (max-width: 600px) {
    margin: 10px;
    height: calc(100vh - 20px);
    flex-direction: column-reverse;
    justify-content: flex-end;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  * {
    margin-top: 30px;
  }
`;

const SytledImage = styled(Image)`
  border-radius: 50%;
`;

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  address: string;
  phone: string;
  imageUrl: string;
}

export default function Employee() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employee: Employee = data.employee;

  return (
    <EmployeeDetail>
      <Column>
        <h1>
          {employee.firstName} {employee.lastName}
        </h1>
        <p>{employee.role}</p>
        <p>Email: {employee.email}</p>
        <p>Address: {employee.address}</p>
        <p>Phone: {employee.phone}</p>
      </Column>
      <SytledImage
        src={employee.imageUrl}
        alt={`${employee.firstName} ${employee.lastName}`}
        width={200}
        height={200}
      />
    </EmployeeDetail>
  );
}
