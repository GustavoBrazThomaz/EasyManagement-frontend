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

type TableProps = {
  customers: ICustomer[];
};

function Table(props: TableProps) {
  const { customers } = props;

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
    <TableContainer w="full" boxShadow='base' rounded='md' bg="white">
      <TableComponent variant="simple" >
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
          {customers.map((item: ICustomer) => (
            <Tr key={`item_${item._id}`}>
              <Td textAlign="center">{item.name}</Td>
              <Td textAlign="center">{item.email}</Td>
              <Td textAlign="center">R$ {NumberFormatter(item.price)}</Td>
              <Td textAlign="center" color={item.payment ? "green.400" : "red.400"} fontSize="xl">
                {item.payment ? (
                  <AiOutlineCheckCircle />
                ) : (
                  <AiOutlineCloseCircle />
                )}
              </Td>
              <Td textAlign="center">
                <Tooltip label="Editar" >
                  <Button colorScheme="blue" variant="ghost" fontSize="xl" color="blue.400">
                    <AiOutlineEdit />
                  </Button>
                </Tooltip>

                <Tooltip label="Deletar">
                  <Button colorScheme="red" variant="ghost" fontSize="xl" color="red.400">
                    <AiOutlineDelete />
                  </Button>
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableComponent>
    </TableContainer>
  );
}

export default Table;
