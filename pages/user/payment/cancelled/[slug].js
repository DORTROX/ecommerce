import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

export default function Error({ checkoutID }) {
  const router = useRouter();
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      // Redirect to another page when the counter reaches 0
      if (counter === 0) {
        router.push('/');
      } else {
        setCounter(counter - 1); // Decrease the counter by 1
      }
    }, 1000); // Decrease the counter every 1 second

    // Clear the timeout when the component is unmounted
    return () => clearTimeout(redirectTimeout);
  }, [counter]);
  return (
    <Box textAlign='center' py={10} px={6}>
      <Box display='inline-block'>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          bg={"red.500"}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign='center'>
          <CloseIcon boxSize={"20px"} color={"white"} />
        </Flex>
      </Box>
      {checkoutID.startsWith("cs_live_") ? (
        <Box>
          <Heading as='h2' size='xl' mt={6} mb={2}>
            Payment Cancelled
          </Heading>
          <Text color={"gray.500"}>
            There was a issue with your payment and its been cancelled. It may be because you have cancelled or amd error.
          </Text>
          <Text>Redirecting in {counter} seconds</Text>
        </Box>
      ) : (
        <Box>
        <Heading as='h2' size='xl' mt={6} mb={2}>
          Not an authorized payment
        </Heading>
        <Text color={"gray.500"}>
          This doesnt seems to be a payment link
        </Text>
        <Text>Redirecting in {counter} seconds</Text>
      </Box>
      )}
    </Box>
  );
}

export const getServerSideProps = async ({ params: { slug } }) => {
  const checkoutID = slug;
  return {
    props: { checkoutID },
  };
};
