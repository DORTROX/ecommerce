import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";

import { urlFor } from "@/lib/client";

const Card = ({ heading, description, href, bgGet, keyId }) => {
  return (
    <Box
      key={keyId}
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={`url(${urlFor(bgGet)})`}
      bgSize={"cover"}
      textShadow={"1px 1px 10px black"}
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"} textShadow={"2px 2px 10px black"}>
            {description}
          </Text>
        </Box>
        <Link href={href}>
          <Button
            bg={"whiteAlpha.900"}
            fontSize={"sm"}
            color={"black"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Check Out
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default function Featured({ props }) {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Most-Liked Wallpapers
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          Some of the best selling wallpapers
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          {props?.map((feature) => {
            return (
              <Card
              key={feature._id}
                keyId={feature._id}
                bgGet={feature.image[0]}
                heading={feature.name}
                description={feature.description}
                href={feature.link}
              ></Card>
            );
          })}
        </Flex>
      </Container>
    </Box>
  );
}
