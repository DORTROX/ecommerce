import { useUserContext } from "@/context/UserSchema";
import { client, urlFor } from "@/lib/client";
import {
  Box,
  Avatar,
  VStack,
  Heading,
  Divider,
  TableContainer,
  Table,
  Tr,
  Td,
  useColorModeValue,
  Stack,
  Button,
  Text,
  SimpleGrid,
  Thead,
  Tbody,
  Th,
  Flex,
  Image,
  Center,
  HStack,
  Card,
  CardBody,
  Modal,
  onClose,
  isOpen,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  useDisclosure,
  FormControl,
  Select,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";

const fetchProductData = async (itemId) => {
  const query = `*[_type == "product" && slug.current == '${itemId}'][0]`;
  const product = await client.fetch(query);
  return product;
};

const states = [
  "Agra",
  "Ahmedabad",
  "Allahabad",
  "Amritsar",
  "Aurangabad",
  "Bengaluru",
  "Bhopal",
  "Bhubaneswar",
  "Chandigarh",
  "Chennai",
  "Coimbatore",
  "Dehradun",
  "Delhi",
  "Faridabad",
  "Ghaziabad",
  "Gurugram",
  "Guwahati",
  "Hyderabad",
  "Indore",
  "Jaipur",
  "Jammu",
  "Kanpur",
  "Kochi",
  "Kolkata",
  "Lucknow",
  "Ludhiana",
  "Mumbai",
  "Nagpur",
  "Nashik",
  "Noida",
  "Patna",
  "Pune",
  "Rajkot",
  "Ranchi",
  "Surat",
  "Thiruvananthapuram",
  "Vadodara",
  "Varanasi",
  "Visakhapatnam",
];

export default function AccountSetting() {
  const { user } = useUserContext();
  const toast = useToast();

  const [orderCards, setOrderCards] = useState([]);
  const [PersonalInfo, setPersonalInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    id: "",
    fullAddress: "",
    City: "",
    pinCode: "",
  });

  const personalInfoModalDisclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPersonalInfoModalOpen, setPersonalInfoModalOpen] = useState(false);

  const UpdateInfo = async () => {
    await axios.post("https://www.creativewallpapers.work/api/userDb/UpdateUserInfo", PersonalInfo).then(async (Resp) => {
      console.log(Resp)
      if (Resp.status === 200) {
        onClose();
        setPersonalInfoModalOpen(false);
        personalInfoModalDisclosure.onClose();
        toast({
          title: "Information Updated",
          description: "It might take a moment to update",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    });
  };

  useEffect(() => {
    setPersonalInfo({
      fullName: user.name,
      phone: user.phone,
      email: user.email,
      id: user.id,
      fullAddress: user.shippingAddress,
      City: user.City,
      pinCode: user.pinCode,
    });
    const fetchOrderCards = async () => {
      const cards = await Promise.all(
        user.ordersHistory?.map(async (order) => {
          const product = await fetchProductData(order.itemId);

          return (
            <Link  key={order.itemId} href={`/product/${product.slug.current}`}>
            <Card minW={"sm"} maxW={"sm"}>
              <CardBody>
                <Image src={urlFor(product.image[0])} alt='Green double couch with wooden legs' borderRadius='lg' />
                <Stack mt='6' spacing='3'>
                  <Heading size='md'>{product.name}</Heading>
                  <Text>{product.details.slice(0, 40)}...</Text>
                  <Text color='blue.600' fontSize='2xl'>
                    Rs. {product.price}
                  </Text>
                </Stack>
              </CardBody>
            </Card>
            </Link>
          );
        })
      );

      setOrderCards(cards);
    };

    fetchOrderCards();
  }, [user]);
  return (
    <Box p={5}>
      <Box>
        <VStack>
          <Avatar size={"2xl"} src={user.image} />
          <Heading>Hello, {user.name}!</Heading>
          <Text color={"gray.500"}>You can always edit the information and customize your profile to your liking.</Text>
        </VStack>
        <Divider py={5} />
        <SimpleGrid mt={4} templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }} justifyItems={"center"}>
          <Box maxW={"600px"} w={"full"} bg={useColorModeValue("white", "gray.800")} boxShadow={"2xl"} rounded={"md"} overflow={"hidden"}>
            <Stack textAlign={"center"} p={6} color={useColorModeValue("gray.800", "white")} align={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight={500}
                bg={useColorModeValue("green.50", "green.900")}
                p={2}
                px={3}
                color={"green.500"}
                rounded={"full"}>
                Personal
              </Text>
              <Stack direction={"row"} align={"center"} justify={"center"}>
                <Text fontSize={"6xl"} fontWeight={800}>
                  INFO
                </Text>
              </Stack>
            </Stack>

            <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
              <Modal
                isCentered
                onClose={() => {
                  setPersonalInfoModalOpen(false);
                  personalInfoModalDisclosure.onClose();
                }}
                isOpen={isPersonalInfoModalOpen}
                motionPreset='slideInBottom'>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader bg={"blackAlpha.400"}>
                    <Stack textAlign={"center"} p={6} align={"center"}>
                      <Text
                        fontSize={"sm"}
                        fontWeight={500}
                        bg={useColorModeValue("green.50", "green.900")}
                        p={2}
                        px={3}
                        color={"green.500"}
                        rounded={"full"}>
                        Personal
                      </Text>
                      <Stack direction={"row"} align={"center"} justify={"center"}>
                        <Text fontSize={"6xl"} fontWeight={800}>
                          INFO
                        </Text>
                      </Stack>
                    </Stack>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <TableContainer>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Details</Th>
                            <Th>:</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>Phone</Td>
                            <Input
                              value={PersonalInfo.phone}
                              onChange={(event) => {
                                setPersonalInfo({ ...PersonalInfo, phone: event.target.value });
                              }}
                              type='number'></Input>
                          </Tr>
                          <Tr>
                            <Td>Email</Td>
                            <Input
                              value={PersonalInfo.email}
                              onChange={(event) => {
                                setPersonalInfo({ ...PersonalInfo, email: event.target.value });
                              }}
                              type='email'></Input>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme='blue'
                      mr={3}
                      onClick={() => {
                        setPersonalInfoModalOpen(false);
                        personalInfoModalDisclosure.onClose();
                      }}>
                      Close
                    </Button>
                    <Button onClick={UpdateInfo} colorScheme='green' variant='ghost'>
                      Update
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Details</Th>
                      <Th>:</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Full Name</Td>
                      <Td>{!PersonalInfo.fullName ? "None" : PersonalInfo.fullName}</Td>
                    </Tr>
                    <Tr>
                      <Td>Phone</Td>
                      <Td>+91 {!PersonalInfo.phone ? "None" : PersonalInfo.phone}</Td>
                    </Tr>
                    <Tr>
                      <Td>Email</Td>
                      <Td>{!PersonalInfo.email ? "None" : PersonalInfo.email}</Td>
                    </Tr>
                    <Tr>
                      <Td>User ID</Td>
                      <Td>{!PersonalInfo.id ? "None" : PersonalInfo.id}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <Button
                mt={10}
                w={"full"}
                bg={"green.400"}
                color={"white"}
                rounded={"xl"}
                boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
                _hover={{
                  bg: "green.500",
                }}
                onClick={() => {
                  setPersonalInfoModalOpen(true);
                  personalInfoModalDisclosure.onOpen();
                }}
                _focus={{
                  bg: "green.500",
                }}>
                Edit Personal Info
              </Button>
            </Box>
          </Box>
          <Box maxW={"600px"} w={"full"} bg={useColorModeValue("white", "gray.800")} boxShadow={"2xl"} rounded={"md"} overflow={"hidden"}>
            <Stack textAlign={"center"} p={6} color={useColorModeValue("gray.800", "white")} align={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight={500}
                bg={useColorModeValue("green.50", "green.900")}
                p={2}
                px={3}
                color={"green.500"}
                rounded={"full"}>
                Shipping
              </Text>
              <Stack direction={"row"} align={"center"} justify={"center"}>
                <Text fontSize={"6xl"} fontWeight={800}>
                  ADDRESS
                </Text>
              </Stack>
            </Stack>

            <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
              <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader bg={"blackAlpha.400"}>
                    <Stack textAlign={"center"} p={6} align={"center"}>
                      <Text
                        fontSize={"sm"}
                        fontWeight={500}
                        bg={useColorModeValue("green.50", "green.900")}
                        p={2}
                        px={3}
                        color={"green.500"}
                        rounded={"full"}>
                        Shipping
                      </Text>
                      <Stack direction={"row"} align={"center"} justify={"center"}>
                        <Text fontSize={"6xl"} fontWeight={800}>
                          ADDRESS
                        </Text>
                      </Stack>
                    </Stack>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <TableContainer>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Location Info</Th>
                            <Th>:</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>Full Address</Td>
                            <Textarea
                              value={PersonalInfo.fullAddress}
                              onChange={(event) => {
                                setPersonalInfo({ ...PersonalInfo, fullAddress: event.target.value });
                              }}
                              resize={"none"}
                              rows={1}
                            />
                          </Tr>
                          <Tr>
                            <Td>City</Td>
                            <FormControl onChange={(event) => setPersonalInfo({ ...PersonalInfo, City: event.target.value })}>
                              <Select defaultValue={PersonalInfo.City} placeholder='Select city'>
                                {states.map((state) => {
                                  return <option key={state}>{state}</option>;
                                })}
                              </Select>
                            </FormControl>
                          </Tr>
                          <Tr>
                            <Td>Pin Code</Td>
                            <Input
                              value={PersonalInfo.pinCode}
                              type='number'
                              onChange={(event) => {
                                setPersonalInfo({ ...PersonalInfo, pinCode: event.target.value });
                              }}
                              resize={"none"}
                              rows={1}
                            />
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button onClick={UpdateInfo} colorScheme='green' variant='ghost'>
                      Update
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Location Info</Th>
                      <Th>:</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Full Address</Td>
                      <Td>{!PersonalInfo.fullAddress ? "None" : PersonalInfo.fullAddress}</Td>
                    </Tr>
                    <Tr>
                      <Td>Country</Td>
                      <Td>India</Td>
                    </Tr>
                    <Tr>
                      <Td>City</Td>
                      <Td>{!PersonalInfo.City ? "None" : PersonalInfo.City}</Td>
                    </Tr>
                    <Tr>
                      <Td>Pin Code</Td>
                      <Td>{!PersonalInfo.pinCode ? "None" : PersonalInfo.pinCode}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <Button
                onClick={onOpen}
                mt={10}
                w={"full"}
                bg={"green.400"}
                color={"white"}
                rounded={"xl"}
                boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
                _hover={{
                  bg: "green.500",
                }}
                _focus={{
                  bg: "green.500",
                }}>
                Edit Address
              </Button>
            </Box>
          </Box>
        </SimpleGrid>
        <Center id='orderHistory' mt={10}>
          <Heading>Your Previous Orders</Heading>
        </Center>
        <Divider mt={6} />
        {(() => {
          if (orderCards.length == 0 || orderCards.length == null) {
            return (
              <Center>
                <Box textAlign='center' py={10} px={6}>
                  <Heading display='inline-block' as='h2' size='2xl' bgGradient='linear(to-r, teal.400, teal.600)' backgroundClip='text'>
                    Hmm...
                  </Heading>
                  <Text fontSize='18px' mt={3} mb={2}>
                    No previous order found
                  </Text>
                  <Text color={"gray.500"} mb={6}>
                    Seems like you havent ordered something from our store..
                  </Text>

                  <Button colorScheme='teal' bgGradient='linear(to-r, teal.400, teal.500, teal.600)' color='white' variant='solid'>
                    Buy Now !
                  </Button>
                </Box>
              </Center>
            );
          } else {
            return (
              <Flex mt={5} py={5} overflowX='auto' maxW='100%'>
                <HStack spacing='4'>{orderCards}</HStack>
              </Flex>
            );
          }
        })()}
      </Box>
    </Box>
  );
}
