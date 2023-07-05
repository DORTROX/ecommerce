import { client, urlFor } from "@/lib/client";
import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Image,
  SimpleGrid,
  Heading,
  Divider,
  Text,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  Link,
  FormControl,
  Select,
  Input,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf, BsCartPlusFill } from "react-icons/bs";
import { AiOutlineShoppingCart, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import { useUserContext } from "@/context/UserSchema";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const PaperAndPrice = [
  {
    Name: "Arcylic",
    Price: 5,
  },
  { Name: "Aluminium", Price: 50 },
  { Name: "Blown Vinyl", Price: 100 },
  { Name: "Epoxy", Price: 10 },
];

export default function ProductOverView({ product }) {
  const toast = useToast();

  const { onAdd, user, successPayemnt } = useUserContext();
  const [index, setindex] = useState(0);
  const [trolly, settrolly] = useState(1);
  const [wallinfo, setwallinfo] = useState({
    Name: "",
    widthS: 0,
    heightS: 0,
    Quantity: 1,
    Price: 0,
  });
  const [setTotal, setsetTotal] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const PrizeCalcModalDisclosure = useDisclosure();
  const [isPrizeCalcModalOpen, setPrizeCalcModalOpen] = useState(false);

  const [review, setreview] = useState("");
  const truncatedContent = product.details.slice(0, 150);
  const isTruncated = product.details.length > 5;
  const makePayment = async (totalPrice, productId) => {
    if (user.shippingAddress == "" || user.pinCode == "" || user.City == "") {
      return toast({
        title: (
          <Text>
            Complete Your profile before filling order <Link href={"/user/Account"}>Click here</Link>
          </Text>
        ),
        status: "error",
        duration: 9000,
        isClosable: false,
      });
    }
    onClose();
    await initializeRazorpay();
    const data = await axios
      .post("/api/Payment/GenerateOrders", {
        amount: totalPrice,
      })
      .then((t) => t.data);
    const options = {
      key: process.env.RAZORPAY_KEY,
      amount: data.amount,
      currency: data.currency,
      description: "By this your order will be confirmed",
      order_id: data.id,
      handler: async function (response) {
        await successPayemnt(response.razorpay_payment_id, [{ id: productId, size: {width: wallinfo.widthS, height: wallinfo.heightS}, quantity: wallinfo.Quantity, paperPrice: {price : wallinfo.Price, Name: wallinfo.Name} }], true);
        toast({
          title: "Your order has been filled successfully!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  useEffect(() => {
    product.reviews?.forEach((review) => {
      addRev(review.id, review.review);
    });
  }, [product]);

  useEffect(() => {
    if (wallinfo.Name === "") return;
    CalculateTotal();
  }, [wallinfo.Name, wallinfo.Quantity, wallinfo.widthS, wallinfo.heightS]);

  function Promotion() {
    return toast({
      title: "You need to sign up to access this feature",
      status: "warning",
      duration: 9000,
      isClosable: true,
    });
  }

  function CalculateTotal() {
    const PaperInfo = PaperAndPrice.find((paper) => paper.Name === wallinfo.Name);
    setwallinfo({...wallinfo, Price : PaperInfo.Price})
    return setsetTotal(wallinfo.widthS * wallinfo.heightS * PaperInfo.Price * wallinfo.Quantity);
  }
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  const [responseData, setResponseData] = useState([]);

  function addRev(revid, review) {
    axios
      .post("/api/reviews/getReviews", { id: revid })
      .then((response) => {
        response.data.review = review;
        setResponseData((prevData) => [...prevData, response.data]);
      })
      .catch((error) => {
        // Handle error if needed
        console.error(error);
      });
  }

  function postReview() {
    if (user.name == "Guest") return Promotion();
    if (review === "") return;
    let newData = {
      slug: product._id,
      id: user.id,
      review: review,
    };
    axios.post("/api/reviews/updateReview", newData).then(async (Resp) => {
      if (Resp.status === 200) {
        onClose();
        toast({
          title: "Thanks for your review",
          description: `Your review: ${review}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setreview("");
        addRev(newData.id, newData.review);
      }
    });
  }

  return (
    <SimpleGrid p={{ base: 0, md: 50 }} gap={5} templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }}>
      <Modal
        isCentered
        onClose={() => {
          setPrizeCalcModalOpen(false);
          PrizeCalcModalDisclosure.onClose();
        }}
        isOpen={isPrizeCalcModalOpen}
        motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={"blackAlpha.400"}>Get your Wallpaper prize</ModalHeader>
          <ModalCloseButton />
          <ModalBody gap={5}>
            <Text>Select Paper Quality</Text>
            <FormControl>
              <Select
                onChange={(e) => {
                  setwallinfo({ ...wallinfo, Name: e.target.value });
                }}
                placeholder='Select Paper'>
                {PaperAndPrice.map((paper) => {
                  return <option key={paper.Name} value={paper.Name}>{paper.Name}</option>;
                })}
              </Select>
            </FormControl>
            <Text>Select Width Sq. Ft</Text>
            <Input
              type='number'
              onChange={(e) => {
                setwallinfo({ ...wallinfo, widthS: e.target.value });
              }}
            />
            <Text>Select Height Sq. Ft</Text>
            <Input
              type='number'
              onChange={(e) => {
                setwallinfo({ ...wallinfo, heightS: e.target.value });
              }}
            />
            <Text>Select Quantity</Text>
            <Input
              type='number'
              defaultValue={1}
              onChange={(e) => {
                setwallinfo({ ...wallinfo, Quantity: e.target.value });
              }}
            />
          </ModalBody>
          <ModalFooter gap={5}>
            Your Total: {setTotal}
            <Button
              onClick={() => {
                makePayment(setTotal, product._id);
              }}
              bg={"green"}
              px={4}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}>
              Buy now &nbsp; <AiOutlineShoppingCart />
            </Button>
            <Button
              onClick={() => {
                if (user.name === "Guest") return Promotion();
                if (wallinfo.Name === "" && wallinfo.Price === 0, wallinfo.Quantity === 0, wallinfo.heightS === 0 && wallinfo.widthS === 0 ) {
                  return toast({
                    status:"warning",
                    description: "Fill out details correctly",
                    duration: 5000,
                    title:  "Invalid!"
                  })
                };
                setPrizeCalcModalOpen(false);
                PrizeCalcModalDisclosure.onClose()
                onAdd(product,{quantity: parseInt(wallinfo.Quantity), Name: wallinfo.Name, total: setTotal, size: {width: parseInt(wallinfo.widthS), height: parseInt(wallinfo.heightS)}});
              }}
              px={4}
              bg={"white"}
              color={"black"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}>
              Add to cart &nbsp; <BsCartPlusFill />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex w='full' alignItems='center' justifyContent='center'>
        <Box bg={"gray.800"} maxW='sm' borderWidth='1px' rounded='lg' shadow='lg' position='relative'>
          <Image src={urlFor(product.image[0] && product.image[index])} alt={`Picture of ${product.name}`} roundedTop='lg' />
          <Box p='6'>
            <Flex gap={"5"}>
              {product.image.map((image, i) => {
                return (
                  <Box onMouseEnter={() => setindex(i)} key={i} display='flex' alignItems='center'>
                    <Image borderRadius={"10%"} key={i} width={"10vh"} src={urlFor(image)} alt={`${product.name}${i}`} />
                  </Box>
                );
              })}
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Box textAlign={"center"}>
        <Heading>{product.name}</Heading>
        <Divider pt={5} />
        <Box p={5} display={"flex"} justifyContent={{ md: "none", base: "center" }} alignItems='center'>
          {Array(5)
            .fill("")
            .map((_, i) => {
              const roundedRating = Math.round(product.rating * 2) / 2;
              if (roundedRating - i >= 1) {
                return <BsStarFill key={i} style={{ marginLeft: "1" }} color={i < product.rating ? "teal.500" : "gray.300"} />;
              }
              if (roundedRating - i === 0.5) {
                return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
              }
              return <BsStar key={i} style={{ marginLeft: "1" }} />;
            })}
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            {product.reviews ? product.reviews.length : 0} review
          </Box>
        </Box>
        <Box p={5}>
          <SimpleGrid templateColumns={{ base: "repeat(1fr)", md: "repeat(3, 1fr)" }} py={4} gap={4}>
            <Button
              onClick={() => {
                setPrizeCalcModalOpen(true);
              }}>
              Get your Prize
            </Button>
            <Button
              onClick={onOpen}
              px={4}
              colorScheme='blue'
              color={"black"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}>
              + Review &nbsp; <MdOutlineRateReview />
            </Button>
            <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Leave a review !</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Textarea
                    onChange={(event) => {
                      setreview(event.target.value);
                    }}
                    placeholder='Write a review'
                    value={review == "" ? "" : review}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button onClick={postReview} colorScheme='green' variant='ghost'>
                    Add review
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </SimpleGrid>
          <Box
            height={{ base: "50vh", md: "25vh" }}
            sx={{
              "&::-webkit-scrollbar": {
                width: "8px",
                borderRadius: "500px",
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "500px",
                backgroundColor: `rgba(0, 0, 0, 1)`,
              },
            }}
            overflowY={"scroll"}
            borderRadius={"5px"}
            bg={"gray.700"}
            // maxH={"25vh"}
            p={5}>
            <h2 style={{ fontWeight: "bold" }}>About this item: </h2>
            <Text mx={2} fontSize='sm'>
              {showFullContent ? product.details : truncatedContent + "..."}
            </Text>
            {isTruncated && (
              <Button my={1} onClick={toggleContent}>
                {showFullContent ? "Show Less" : "Show More"}
              </Button>
            )}
            <Box my={5}>
              <SimpleGrid templateColumns={{ base: "repeat(1,1fr)", md: "repeat(1,1fr)", xl: "repeat(1,1fr) repeat(1,2fr)" }}>
                <Box alignItems={"center"} textAlign={"center"}>
                  <Heading fontWeight={"medium"} letterSpacing={0}>
                    Review
                  </Heading>
                  <Text fontSize={"5xl"} fontWeight={"bold"}>
                    {product.rating}
                  </Text>
                  <Box pt={5} display={"flex"} justifyContent={"center"} alignItems='center'>
                    {Array(5)
                      .fill("")
                      .map((_, i) => {
                        const roundedRating = Math.round(product.rating * 2) / 2;
                        if (roundedRating - i >= 1) {
                          return <BsStarFill key={i} style={{ marginLeft: "1" }} color={i < product.rating ? "teal.500" : "gray.300"} />;
                        }
                        if (roundedRating - i === 0.5) {
                          return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
                        }
                        return <BsStar key={i} style={{ marginLeft: "1" }} />;
                      })}
                  </Box>
                </Box>
                <Box>
                  <Tabs>
                    <TabList>
                      <Tab>All</Tab>
                      <Tab>5 star</Tab>
                      <Tab>1 Star</Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        {responseData.map((data, index) => (
                          <Box key={index}>
                            <Box display={"flex"} alignItems={"top"} gap={5} my={4} key={index}>
                              <Avatar src={data.image} />
                              <Box display={"block"} textAlign={"left"}>
                                <p>{data.name}</p>
                                <p>{data.review}</p>
                              </Box>
                            </Box>
                            <Divider />
                          </Box>
                        ))}
                      </TabPanel>
                      <TabPanel>
                        <p>two!</p>
                      </TabPanel>
                      <TabPanel>
                        <p>three!</p>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              </SimpleGrid>
            </Box>
          </Box>
        </Box>
      </Box>
    </SimpleGrid>
  );
}

export const getServerSideProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

  const product = await client.fetch(query);
  return {
    props: { product },
  };
};
