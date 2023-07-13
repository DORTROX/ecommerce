import { Box, Heading, Text, Link } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { connectMongo } from "@/lib/connectMongo";
import User from "@/model/user";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useUserContext } from "@/context/UserSchema";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default function Info({ order, isPreviousOrder }) {
  const router = useRouter();

  const { user, successPayemnt } = useUserContext();
  const [counter, setCounter] = useState(5);


  useEffect(() => {
    if (isPreviousOrder !== -1) return;
    if (user.name === "Guest") return;
    successPayemnt(order.id, order.payment_method_types[0]);
  }, [user]);

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      // Redirect to another page when the counter reaches 0
      if (counter === 0) {
        router.push("/");
      } else {
        setCounter(counter - 1); // Decrease the counter by 1
      }
    }, 1000); // Decrease the counter every 1 second

    // Clear the timeout when the component is unmounted
    return () => clearTimeout(redirectTimeout);
  }, [counter]);

  return (
    <Box textAlign='center' py={10} px={6}>
      <CheckCircleIcon boxSize={"50px"} color={"blue.500"} />
      <Heading as='h2' size='xl' mt={6} mb={2}>
        Payment Successfull!
      </Heading>
      <Text>Order ID: {order.id}</Text>

      <Text color={"gray.500"}>
        You can track your order status in <Link href={"/user/Account/#orderHistory"}>Here.</Link>You can check the reciept in your email.
      </Text>
      <Text color={"gray.500"}>Amount: {order.amount_total / 100}rs</Text>
      <Text>Redirecting in {counter}'s</Text>
    </Box>
  );
}

export const getServerSideProps = async ({ params: { slug } }) => {
  await connectMongo();

  const session = await stripe.checkout.sessions.retrieve(slug);

  const user = await User.findOne({ email: session.customer_details.email });

  const isPreviousOrder = user.OrderHistory.findIndex((order) => order.orderId === slug);
  return {
    props: { order: session, isPreviousOrder },
  };
};
