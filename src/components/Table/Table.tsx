import { useState } from 'react'
import {
  Table as TableComponent,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { ICustomer } from "../../pages/Home/repository/Customer";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import TablePagination from "../TablePagination/TablePagination";

type TableProps = {
  customers: ICustomer[];
  handleDelete: (customer: ICustomer) => void;
  handleEdit: (customer: ICustomer) => void;
};

function Table(props: TableProps) {
  const { customers, handleDelete, handleEdit } = props;
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = currentPage * rowsPerPage;
  const displayItems = customers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(customers.length / rowsPerPage);
  
  const handlePaginate = (novaPagina: number) => {
    if (novaPagina > 0 && novaPagina <= totalPages) {
      setCurrentPage(novaPagina);
    }
  };


  function NumberFormatter(price: number | string) {
    return price.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  if (!customers) {
    return <Box>Sem resultados Por favor crie um cliente</Box>;
  }

  return (
    <TableContainer w="full" boxShadow="base" rounded="md" bg="white">
      <TableComponent variant="simple">
        <Thead bg="gray.50">
          <Tr>
            <Th textAlign="center">Nome</Th>
            <Th textAlign="center">Email</Th>
            <Th textAlign="center">Valor</Th>
            <Th textAlign="center">Pago</Th>
            <Th textAlign="center">Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {displayItems.map((customer: ICustomer) => (
            <Tr key={`item_${customer._id}`}>
              <Td textAlign="center">{customer.name}</Td>
              <Td textAlign="center">{customer.email}</Td>
              <Td textAlign="center">R$ {NumberFormatter(customer.price)}</Td>
              <Td
                textAlign="center"
                color={customer.payment ? "green.400" : "red.400"}
                fontSize="xl"
              >
                {customer.payment ? (
                  <AiOutlineCheckCircle />
                ) : (
                  <AiOutlineCloseCircle />
                )}
              </Td>
              <Td textAlign="center">
                <Tooltip label="Editar">
                  <Button
                    onClick={() => handleEdit(customer)}
                    colorScheme="blue"
                    variant="ghost"
                    fontSize="xl"
                    color="blue.400"
                  >
                    <AiOutlineEdit />
                  </Button>
                </Tooltip>

                <Tooltip label="Deletar">
                  <Button
                    onClick={() => handleDelete(customer)}
                    colorScheme="red"
                    variant="ghost"
                    fontSize="xl"
                    color="red.400"
                  >
                    <AiOutlineDelete />
                  </Button>
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableComponent>

      <TablePagination
        currentPage={currentPage}
        onPageChange={(page) => handlePaginate(page)}
        totalPages={totalPages}
      />
    </TableContainer>
  );
}

export default Table;
