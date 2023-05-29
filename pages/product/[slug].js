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
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf, BsCartPlusFill } from "react-icons/bs";
import { AiOutlineShoppingCart, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import { useUserContext } from "@/context/UserSchema";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
// import { useRouter } from "next/router";

export default function ProductOverView({ product }) {
  const toast = useToast();

  const { onAdd, user } = useUserContext();
  const [index, setindex] = useState(0);
  const [trolly, settrolly] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [review, setreview] = useState("");
  let truncatedContent, isTruncated;
  useEffect(() => {
    product.reviews?.forEach((review) => {
      addRev(review.id, review.review);
    });
    truncatedContent = product.details.slice(0, 150);
    isTruncated = product.details.length > 5;
  }, [product]);

  function Promotion() {
    return toast({
      title: "You need to sign up to access this feature",
      status: "warning",
      duration: 9000,
      isClosable: true,
    });
  }
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  const [responseData, setResponseData] = useState([]);

  function addRev(revid, review) {
    axios
      .post("https://ecommerce-dortrox.vercel.app/api/reviews/getReviews", { id: revid })
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
    axios.post("https://ecommerce-dortrox.vercel.app/api/reviews/updateReview", newData).then(async (Resp) => {
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
          <Text fontSize={"xl"}>M.R.P : {product.price}</Text>
          <Flex justifyContent={{ md: "none", base: "center" }} pt={2} gap={5} alignItems={"center"}>
            <Button
              onClick={() => {
                if (trolly === 1) return;
                settrolly((prevInt) => prevInt - 1);
              }}>
              <AiOutlineMinus />
            </Button>
            {trolly}
            <Button onClick={() => settrolly((prevInt) => prevInt + 1)}>
              <AiOutlinePlus />{" "}
            </Button>
          </Flex>
          <SimpleGrid templateColumns={{ base: "repeat(1fr)", md: "repeat(3, 1fr)" }} py={4} gap={4}>
            <Button
              onClick={() => {
                if (user.name === "Guest") return Promotion();
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
                onAdd(product, trolly, product.slug.current);
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

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
        slug {
          current
        }
      }
      `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

  const product = await client.fetch(query);
  return {
    props: { product },
  };
};
