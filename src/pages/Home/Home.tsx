import { useState, useEffect } from "react";
import { Button, Flex } from "@chakra-ui/react";
import Table from "../../components/Table/Table";
import { ICustomer, getCustomers } from "./repository/Customer";
import { useCustomerStore } from "../../store/CustomerStore";
import CreateCustomerModal from "../../components/CreateModal/CreateCustomerModal";

function Home() {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const {
    open_create,
    open_delete,
    open_edit,
    customer_edit,
    setCustomerToEdit,
    toggleOpenCreate,
    toggleOpenDelete,
    toggleOpenEdit,
    refresh
  } = useCustomerStore();

  async function getAllCustomers() {
    const response = await getCustomers();
    setCustomers(response.data);
  }

  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {
    getAllCustomers();
  }, [refresh]);

  return (
    <Flex justify="center" align="center" flexDirection="column" maxW="container.md" h="100vh">

      <Flex justifyContent="end" w="full" mb="5">
        <Button colorScheme="blue" boxShadow='base' rounded='md' onClick={toggleOpenCreate}>Criar Cliente</Button>
      </Flex>

      <Table customers={customers} />
      <CreateCustomerModal open={open_create} />
    </Flex>
  );
}

export default Home;
