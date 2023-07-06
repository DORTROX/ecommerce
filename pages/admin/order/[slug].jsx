// import { useUserContext } from "@/context/UserSchema";
import { useUserContext } from "@/context/UserSchema";
import { RazorpayInstance } from "@/lib/RazorPay";
import { client, urlFor } from "@/lib/client";
import { connectMongo } from "@/lib/connectMongo";
import Orders from "@/model/Orders";
import User from "@/model/user";
import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Avatar,
  Heading,
  Text,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Select,
  Image,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
const fetchProductData = async (itemId) => {
  const query = `*[_type == "product" && _id == '${itemId}'][0]`;
  const product = await client.fetch(query);
  return product;
};

export default function BasicStatistics({ order, paymentDetails, users }) {
  const { user } = useUserContext();
  const [orderCards, setOrderCards] = useState([]);
  const toast = useToast();
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
  function StatsCard(props) {
    const { title, stat, icon } = props;
    return (
      <Stat px={{ base: 2, md: 4 }} py={"5"} shadow={"xl"} border={"1px solid"} borderColor={"gray.500"} rounded={"lg"}>
        <Flex justifyContent={"space-between"}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
              {stat}
            </StatNumber>
          </Box>
          <Box my={"auto"} color={"gray.200"} alignContent={"center"}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }
  useEffect(() => {
    const FetchProducts = async () => {
      const matchingOrder = users.OrderHistory.find((orders) => orders.orderId === order.orderId);
      const matchingItemIds = await Promise.all(
        matchingOrder.itemId.map(async (item) => {
          const product = await fetchProductData(item.id);
          return (
            <Box
              key={item.id}
              my={4}
              role={"group"}
              p={6}
              maxW={"330px"}
              w={"full"}
              bg={"gray.700"}
              boxShadow={"2xl"}
              rounded={"lg"}
              pos={"relative"}
              zIndex={1}>
              <Box
                rounded={"lg"}
                mt={-12}
                pos={"relative"}
                height={"230px"}
                _after={{
                  transition: "all .3s ease",
                  content: '""',
                  w: "full",
                  h: "full",
                  pos: "absolute",
                  top: 5,
                  left: 0,
                  backgroundImage: `url(${urlFor(product.image[0])})`,
                  filter: "blur(15px)",
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: "blur(20px)",
                  },
                }}>
                <Image rounded={"lg"} height={230} width={282} objectFit={"cover"} src={urlFor(product.image[0])} />
              </Box>
              <Stack pt={10} align={"center"}>
                <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
                  {product.name}
                </Heading>
                <Stack direction={"row"} align={"center"}>
                  <Text fontWeight={400} fontSize={"lg"}>
                    Width : {item.size.width} Height: {item.size.height}
                  </Text>
                </Stack>
                <Text fontWeight={"800"}>Quantity: {item.quantity}</Text>
                <Text fontWeight={"800"}>Paper: {item.paperPrice.Name}</Text>
              </Stack>
            </Box>
          );
        })
      );
      setOrderCards(matchingItemIds);
    };
    FetchProducts();
  }, [order.id]);

  return (
    <Box maxW='7xl' mx={"auto"} my={10} px={{ base: 2, sm: 12, md: 17 }}>
      {user.access ? (
        <Box>
          <chakra.h1 textAlign={"center"} fontSize={"4xl"} fontWeight={"bold"}>
            PAYMENT IDENTIFICATION NO
          </chakra.h1>
          <chakra.h1 textAlign={"center"} fontSize={"2xl"} py={2} fontWeight={"bold"}>
            {order.orderId}
          </chakra.h1>
          <Divider my={4} />

          <SimpleGrid my={5} columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <StatsCard title={"Payment Mode"} stat={order.paymentMode} icon={<BsFillCreditCard2FrontFill size={"3em"} />} />
            <StatsCard title={"Total Amount"} stat={paymentDetails.amount / 100} icon={<GiPayMoney size={"3em"} />} />
            <StatsCard
              title={"Delivery Status"}
              stat={
                <Select onChange={(e) => updatePayments(order.orderId, e.target.value)} defaultValue={order.Delivered}>
                  <option value='Delivered'>Delivered</option>
                  <option value='Not Delivered'>Not Delivered</option>
                </Select>
              }
              icon={<TbTruckDelivery size={"3em"} />}
            />
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
            <Box maxH={"70vh"} border={"1px solid"} borderColor={"gray.500"} px={{ base: 2, md: 4 }} py={"5"} shadow={"xl"} rounded={"lg"}>
              <Heading textAlign={"center"}>Personal Information</Heading>
              <Divider my={4} />

              <Box m={4} display={"flex"} gap={5} alignItems={"center"}>
                <Avatar size={{ base: "lg", md: "xl" }} src={users.image} />
                <Box textAlign={"end"}>
                  <Heading>{users.name}</Heading>
                  <Text>{users.email}</Text>
                  <Text mx={4}>{users.phone}</Text>
                </Box>
              </Box>
              <Divider />
              <Heading textAlign={"center"} my={3}>
                Shipping Address
              </Heading>
              <Box m={4}>
                <TableContainer>
                  <Table variant={"simple"}>
                    <Thead>
                      <Tr>
                        <Th>Details</Th>
                        <Th>Info</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>City</Td>
                        <Td>{users.City}</Td>
                      </Tr>
                      <Tr>
                        <Td>Postal Code</Td>
                        <Td>{users.Postal_Code}</Td>
                      </Tr>
                      <Tr>
                        <Td>Full Address</Td>
                        <Td>
                          <Box wordBreak='break-word'>{users.Shipping_Address}</Box>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
            <Box border={"1px solid"} borderColor={"gray.500"} px={{ base: 2, md: 4 }} py={"5"} shadow={"xl"} rounded={"lg"}>
              <Heading textAlign={"center"}>Order</Heading>
              <Divider my={4} />
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                {orderCards}
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </Box>
      ) : (
        <Heading>You dont have access to this page</Heading>
      )}
    </Box>
  );
}

export async function getServerSideProps({ params: { slug } }) {
  await connectMongo();
  const order = await Orders.findOne({ orderId: slug });
  const paymentDetails = await RazorpayInstance.payments.fetch(slug);
  const serializedPaymentDetails = JSON.parse(JSON.stringify(paymentDetails));
  const serializedOrder = JSON.parse(JSON.stringify(order));
  const users = await User.findOne({ email: order.email });
  const serializedUser = JSON.parse(JSON.stringify(users));

  return {
    props: { order: serializedOrder, paymentDetails: serializedPaymentDetails, users: serializedUser },
  };
}
