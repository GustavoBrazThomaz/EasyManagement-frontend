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
import { ICustomer, postCustomer } from "../../pages/Home/repository/Customer";
import { useForm } from "react-hook-form";
import { stringToBoolean } from "../../utils/StringToBoolean";

type CustomerForm = {
  name: string;
  email: string;
  price: string;
  payment: string;
};

function CreateCustomerModal({ open }: IModalProps) {
  const { toggleOpenCreate, toggleRefresh } = useCustomerStore();
  const { register, handleSubmit } = useForm<CustomerForm>();
  const toast = useToast();

  function onClose() {
    toggleOpenCreate();
  }

  async function handleCreateCustomer(form: CustomerForm) {
    const { name, email, payment, price } = form;
    const customer: ICustomer = {
      name,
      email,
      payment: stringToBoolean(payment),
      price: parseFloat(price),
    };

    try {
      await postCustomer(customer);

      toast({
        title: "Cliente criado com sucesso",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      toggleRefresh();
      toggleOpenCreate();
    } catch {
      toast({
        title: "Erro ao criar cliente",
        description: "verifique as informações",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  return (
    <Modal onClose={onClose} isOpen={open} isCentered>
      <ModalOverlay />
      <ModalContent>
        <form
          style={{ width: "100%" }}
          onSubmit={handleSubmit(handleCreateCustomer)}
        >
          <ModalHeader textAlign="center">Criar Cliente</ModalHeader>
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
            <Button colorScheme="gray" onClick={onClose}>
              Fechar
            </Button>
            <Button type="submit" colorScheme="blue">
              Criar Cliente
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default CreateCustomerModal;
