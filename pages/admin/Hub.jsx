import { useUserContext } from "@/context/UserSchema";
import {
  Button,
  useColorModeValue,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Select,
  Link,
  useToast,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Simple() {
  const { user } = useUserContext();
  const [pagination, setpagination] = useState(0);
  const [pays, setpays] = useState([]);
  const toast = useToast();
  const morePayments = async () => {
    const response = await axios.post("/api/Payment/GetPayments", {
      enums: pagination,
    });
    if (response.data.length > 0) {
      setpays((prevPays) => [...prevPays, ...response.data]);
      setpagination((prevpagination) => prevpagination + 1);
    }
  };
  const updatePayments = async (payId, value) => {
    const response = await axios.post("/api/Payment/UpdatePaymentStatus", {
      id: payId,
      status: value,
    });
    if (response.status == 200) {
      toast({
        title: `Order : ${payId} updated Successfully`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    morePayments();
  }, []);

  return (
    <Box my={10} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      {user.access ? (
        <Box>
          <TableContainer>
            <Table variant='simple'>
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Order Id</Th>
                  <Th>Payment Mode</Th>
                  <Th>Email</Th>
                  <Th>Delivered</Th>
                  <Th>Created At</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pays.length == 0 ? (
                  <Tr>
                    <Td>None</Td>
                    <Td>None</Td>
                    <Td>None</Td>
                    <Td>None</Td>
                  </Tr>
                ) : (
                  pays.map((payments) => {
                    return (
                      <Tr
                        my={3}
                        maxH={"40vh"}
                        maxW={"70vw"}
                        bg={"whiteAlpha.100"}
                        boxShadow={"xl"}
                        rounded={"lg"}
                        p={3}
                        direction={"column"}>
                        <Td>
                          <Link href={`/admin/order/${payments.orderId}`}>{payments.orderId}</Link>
                        </Td>
                        <Td>{payments.paymentMode}</Td>
                        <Td>{payments.email}</Td>
                        <Td>
                          <Select onChange={(e) => updatePayments(payments.orderId, e.target.value)} defaultValue={payments.Delivered}>
                            <option value='Delivered'>Delivered</option>
                            <option value='Not Delivered'>Not Delivered</option>
                          </Select>
                        </Td>
                        <Td>{payments.created_at}</Td>
                      </Tr>
                    );
                  })
                )}
              </Tbody>
            </Table>
          </TableContainer>
          <Button onClick={morePayments}>Explore More</Button>
        </Box>
      ) : (
        <Heading>You dont have access to this page</Heading>
      )}
    </Box>
  );
}
