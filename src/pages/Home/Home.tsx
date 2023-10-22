import { useState, useEffect } from "react";
import { Button, CircularProgress, Flex } from "@chakra-ui/react";
import Table from "../../components/Table/Table";
import { ICustomer, getCustomers } from "./repository/Customer";
import { useCustomerStore } from "../../store/CustomerStore";
import CreateCustomerModal from "../../components/CreateModal/CreateCustomerModal";
import DeleteCustomerModal from "../../components/DeleteModal/DeleteCustomerModal";
import EditCustomerModal from "../../components/EditModal/EditCustomerModal";

function Home() {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  const {
    open_create,
    open_delete,
    open_edit,
    setCustomer,
    toggleOpenCreate,
    toggleOpenDelete,
    toggleOpenEdit,
    refresh
  } = useCustomerStore();

  async function getAllCustomers() {
    setIsLoading(true)
    const response = await getCustomers();
    setCustomers(response.data);
    setIsLoading(false)
  }

  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {
    getAllCustomers();
  }, [refresh]);

  function openDeleteCustomer(customer: ICustomer){
    setCustomer(customer)
    toggleOpenDelete()
  }

  function openEditCustomer(customer: ICustomer){
    setCustomer(customer)
    toggleOpenEdit()
  }


  if(isLoading) return (
    <Flex justify="center" align="center" flexDirection="column" maxW="container.md" h="90vh">
      <CircularProgress isIndeterminate color='blue.400' />
    </Flex>
  )

  return (
    <Flex justify="center" align="center" flexDirection="column" maxW="container.md" h="90vh">

      <Flex justifyContent="end" w="full" mb="5">
        <Button colorScheme="blue" boxShadow='base' rounded='md' onClick={toggleOpenCreate}>Criar Cliente</Button>
      </Flex>

      <Table customers={customers} handleDelete={openDeleteCustomer} handleEdit={openEditCustomer}/>
      <CreateCustomerModal open={open_create} />
      <DeleteCustomerModal open={open_delete}/>
      <EditCustomerModal open={open_edit}/>
    </Flex>
  );
}

export default Home;
