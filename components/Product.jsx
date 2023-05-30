import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  Icon,
  chakra,
  Tooltip,
  Grid,
  Center,
  Text,
  Tag,
  TagLabel,
  TagLeftIcon,
  HStack,
  Link,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { AddIcon } from "@chakra-ui/icons";
import { urlFor } from "@/lib/client";

function Rating({ rating, numReviews }) {
  return (
    <Box display={"flex"} alignItems='center'>
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return <BsStarFill key={i} style={{ marginLeft: "1" }} color={i < rating ? "teal.500" : "gray.300"} />;
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as='span' ml='2' color='gray.600' fontSize='sm'>
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}

function ProductAddToCart({ products, tags }) {
  return (
    <Box my={"2%"} width='100%' display='flex' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center'>
      <HStack spacing={4}>
        {(tags != undefined ? tags[0] != 0 || tags[1] != 0 || tags[2] != 0 : false) ? <Text>Tags:</Text> : ""};
        {tags?.map((tag) => {
          const matches = tag.match(/"([^"]*)"/g);
          return matches?.map((tag) => {
            return (
              <Tag size={"sm"} key={tag} variant='subtle' colorScheme='cyan'>
                <TagLeftIcon boxSize='12px' as={AddIcon} />
                <TagLabel>{tag}</TagLabel>
              </Tag>
            );
          });
        })}
      </HStack>

      <Grid
        w={"100%"}
        gap={4}
        templateColumns={
          products && products.length > 0 ? { base: "1fr", md: "repeat(2, 1fr)", xl: "repeat(4, 1fr)" } : { base: "1fr", md: "1fr" }
        }>
        {products && products.length > 0 ? (
          products.map((product) => {
            return (
              <Box
                key={product.name}
                _hover={{
                  transform: "translateY(-8px)",
                  boxShadow: "lg",
                  transition: "0.2s all",
                }}
                margin={"0 auto"}
                bg={"gray.800"}
                maxW='sm'
                borderWidth='1px'
                rounded='lg'
                shadow='lg'
                position='relative'>
                {product.isNew && <Circle size='10px' position='absolute' top={2} right={2} bg='red.200' />}

                <Image src={urlFor(product.image[0])} alt={`Picture of ${product.name}`} roundedTop='lg' />
                <Box p='6'>
                  <Box d='flex' alignItems='baseline'>
                    {product.isNew && (
                      <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='red'>
                        New
                      </Badge>
                    )}
                  </Box>
                  <Flex mt='1' justifyContent='space-between' alignContent='center'>
                    <Box fontSize='2xl' fontWeight='semibold' as='h4' lineHeight='tight' isTruncated>
                    <Link href={`/product/${product.slug.current}`}>
                      {product.name}
                      </Link>
                    </Box>
                    <Tooltip label='Add to cart' bg='white' placement={"top"} color={"gray.800"} fontSize={"1.2em"}>
                      <chakra.a href={"#"} display={"flex"}>
                        <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
                      </chakra.a>
                    </Tooltip>
                  </Flex>
                  <Flex justifyContent='space-between' alignContent='center'>
                    <Rating rating={parseFloat(product.rating)} numReviews={product.reviews ? product.reviews.length : 0} />
                    <Box fontSize='2xl' color={"white"}>
                      <Box as='span' color={"gray.600"} fontSize='lg'>
                        Rs.
                      </Box>
                      {product.price.toFixed(1)}
                    </Box>
                  </Flex>
                </Box>
              </Box>
            );
          })
        ) : (
          <Center>
            <Box>
              <Image src={"/Images/NotFound.png"}></Image>
              <Text fontSize='xl' textAlign='center' mt='4'>
                Not found
              </Text>
            </Box>
          </Center>
        )}
      </Grid>
    </Box>
  );
}

export default ProductAddToCart;
