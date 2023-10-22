import { Button, Flex, Text } from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Flex w="full" justifyContent="flex-end" alignItems="center" gap={2}>
      <Button variant="ghost" onClick={handlePrevious}>
        <AiOutlineArrowLeft />
      </Button>
      <Text>
        Página {currentPage} de {totalPages}
      </Text>
      <Button variant="ghost" onClick={handleNext}>
        <AiOutlineArrowRight />
      </Button>
    </Flex>
  );
}

export default TablePagination;
