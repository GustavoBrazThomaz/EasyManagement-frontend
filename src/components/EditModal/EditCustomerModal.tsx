import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useCustomerStore } from "../../store/CustomerStore";
import { IModalProps } from "../../interfaces/modalProps";
import { ICustomer, putCustomer } from "../../pages/Home/repository/Customer";
import { useForm } from "react-hook-form";
import { stringToBoolean } from "../../utils/StringToBoolean";

type CustomerForm = {
  name: string;
  email: string;
  price: string;
  payment: string;
};

function EditCustomerModal({ open }: IModalProps) {
  const { toggleOpenEdit, customer, toggleRefresh } = useCustomerStore();
  const { register, handleSubmit } = useForm<CustomerForm>({
    values: {
      name: customer.name,
      email: customer.email,
      price: customer.price.toString(),
      payment: customer.payment.toString(),
    }
  });

  const toast = useToast();

  async function handleCreateCustomer(form: CustomerForm) {
    if (customer) {
      const { name, email, payment, price } = form;
      const customerObj: ICustomer = {
        _id: customer._id,
        name,
        email,
        payment: stringToBoolean(payment),
        price: parseFloat(price),
      };

      try {
        await putCustomer(customerObj);

        toast({
          title: "Cliente editado com sucesso",
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        toggleRefresh();
        toggleOpenEdit();
      } catch {
        toast({
          title: "Erro ao editar cliente",
          description: "verifique as informações",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Erro ao editar cliente",
        description: "verifique as informações",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      toggleOpenEdit();
    }
  }

  return (
    <Modal onClose={toggleOpenEdit} isOpen={open} isCentered>
      <ModalOverlay />
      <ModalContent>
        <form
          style={{ width: "100%" }}
          onSubmit={handleSubmit(handleCreateCustomer)}
        >
          <ModalHeader textAlign="center">Editar Cliente</ModalHeader>
          <ModalCloseButton />

          <ModalBody w="full">
            <Stack>
              <Input
                {...register("name", { required: true })}
                variant="outline"
                placeholder="Nome"
              />
              <Input
                {...register("email", { required: true })}
                variant="outline"
                placeholder="Email"
                type="email"
              />

              <Select
                placeholder="Pagamento"
                {...register("payment", { required: true })}
              >
                <option value={"false"}>Não ocorreu</option>
                <option value={"true"}>Ocorreu</option>
              </Select>

              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="R$"
                />
                <Input
                  {...register("price", { required: true })}
                  placeholder="Enter amount"
                  type="number"
                />
              </InputGroup>
            </Stack>
          </ModalBody>

          <ModalFooter w="full" gap="4">
            <Button colorScheme="gray" onClick={toggleOpenEdit}>
              Fechar
            </Button>
            <Button type="submit" colorScheme="blue">
              Editar Cliente
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default EditCustomerModal;
