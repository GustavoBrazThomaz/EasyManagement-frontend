import { Flex, Text, Link as LinkText } from "@chakra-ui/react";

function Appbar() {
  return (
    <Flex
      w="full"
      bg="blue.500"
      h="14"
      p={2}
      justifyContent="space-between"
      alignItems="center"
      color="white"
    >
      <Text ml={8} as="b" fontSize="2xl">
        GestãoFácil
      </Text>

      <Text>
        Criado, Idealizado e Desenvolvido por{" "}
        <LinkText href="https://github.com/GustavoBrazThomaz" target="_blank">
          Gustavo Braz
        </LinkText>
      </Text>
 
    </Flex>
  );
}

export default Appbar;
