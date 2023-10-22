import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCustomerStore } from "../../store/CustomerStore";
import { IModalProps } from "../../interfaces/modalProps";
import { deleteCustomer } from "../../pages/Home/repository/Customer";

function DeleteCustomerModal({ open }: IModalProps) {
  const { toggleOpenDelete, toggleRefresh, customer } = useCustomerStore();
  const toast = useToast();

  async function handleDelete() {
    if (customer) {
      try {
        if (customer._id) await deleteCustomer(customer._id);

        toast({
          title: "Cliente deletado com sucesso",
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        toggleRefresh();
        toggleOpenDelete();
      } catch {
        toast({
          title: "Erro ao deletar cliente",
          description: "verifique as informações",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Erro ao deletar cliente",
        description: "verifique as informações",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      toggleOpenDelete();
    }
  }

  return (
    <Modal onClose={toggleOpenDelete} isOpen={open} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Deletar Cliente</ModalHeader>
        <ModalCloseButton />

        <ModalBody w="full" textAlign="center">
            <Text>Você realmente deseja deletar esse cliente?</Text>{" "}
            <Text as="b">Essa ação é irreversível</Text>

        </ModalBody>

        <ModalFooter w="full" gap="4">
          <Button colorScheme="gray" onClick={toggleOpenDelete}>
            Fechar
          </Button>
          <Button onClick={handleDelete} colorScheme="red">
            Deletar Cliente
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteCustomerModal;
