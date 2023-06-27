import { Text, Heading, Box, Divider, ListItem, UnorderedList } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
const Toc = () => {
  return (
    <Box m={10} px={{ base: 0, md: "20%" }}>
      <Box>
        <Heading>Terms and Conditions</Heading>
        <Text mx={3} my={2}>
          Updated at 2023-06-23
        </Text>
      </Box>
      <Divider my={10} />
      <Box m={4}>
        <Text color={"white.400"} fontWeight={"bold"}>
          Welcome to Creative Wallpapers! These terms and conditions outline the rules and regulations for the use of our website. By
          accessing this website, we assume you accept these terms and conditions in full. Do not continue to use our website if you do not
          agree to all the terms and conditions stated on this page.
        </Text>
        <br />
        <Text>
          The following terminology applies to these terms and conditions, the Privacy Statement, and any or all Agreements: "Client,"
          "You," and "Your" refers to you, the person accessing this website and accepting the Company's terms and conditions. "The
          Company," "Ourselves," "We," "Our," and "Us" refers to our Company. "Party," "Parties," or "Us" refers to both the Client and
          ourselves, or either the Client or ourselves.
        </Text>
        <Divider my={4} />
        <Box>
          <Heading>Intellectual Property</Heading>
          <Text m={5}>
            The content and materials on this website, including but not limited to text, graphics, images, logos, trademarks, and
            downloadable files, are the intellectual property of [Your Company Name] and are protected by applicable copyright and trademark
            laws. You may not reproduce, distribute, or modify any content without our prior written consent.
          </Text>
        </Box>
        <Divider my={4} />

        <Box>
          <Heading>Website Use</Heading>
          <UnorderedList m={5} spacing={2}>
            <ListItem>You must be at least 18 years old or have the consent of a legal guardian to use our website.</ListItem>
            <ListItem>
              You agree to use our website only for lawful purposes and in a manner that does not infringe upon the rights of others or
              restrict or inhibit their use and enjoyment of the website.
            </ListItem>
            <ListItem>
              You are responsible for maintaining the confidentiality of any login information associated with your account.
            </ListItem>
            <ListItem>
              You are responsible for maintaining the confidentiality of any login information associated with your account.
            </ListItem>
          </UnorderedList>
        </Box>

        <Divider my={4} />

        <Box>
          <Heading>Product Information and Pricing</Heading>
          <UnorderedList m={5} spacing={2}>
            <ListItem>
              We make every effort to provide accurate and up-to-date information about our products, including descriptions, prices, and
              availability. However, we do not guarantee the accuracy or completeness of this information.
            </ListItem>
            <ListItem>Prices are subject to change without notice.</ListItem>
            <ListItem>We reserve the right to limit the quantities of any products or services we offer.</ListItem>
            <ListItem>We are not responsible for any errors or inaccuracies in the content or pricing on our website.</ListItem>
          </UnorderedList>
        </Box>
        <Divider my={4} />

        <Box>
          <Heading>Ordering and Payment</Heading>
          <UnorderedList m={5} spacing={2}>
            <ListItem>
              By placing an order through our website, you warrant that you are legally capable of entering into a binding contract.
            </ListItem>
            <ListItem>All orders are subject to acceptance and availability.</ListItem>
            <ListItem>
              We accept various payment methods, and all payments are securely processed. However, we are not responsible for any issues or
              errors that may arise during the payment process.
            </ListItem>
          </UnorderedList>
        </Box>
        <Divider my={4} />

        <Box>
          <Heading>Delivery and Installation</Heading>
          <UnorderedList m={5} spacing={2}>
            <ListItem>
              We strive to ensure timely delivery of our products. However, delivery times may vary depending on various factors, and we do
              not guarantee specific delivery dates.
            </ListItem>
            <ListItem>
              If you opt for our installation services, additional terms and conditions may apply. Please contact us for more information.
            </ListItem>
          </UnorderedList>
        </Box>
        <Divider my={4} />
        <Box>
          <Heading>Cancellation Policy</Heading>
          <UnorderedList m={5} spacing={2}>
            <ListItem>Once an order or reservation is placed, it is considered final and cannot be canceled or refunded.</ListItem>
            <ListItem>All sales are final, and no cancellations will be accepted under any circumstances.</ListItem>
            <ListItem>We do not offer any refunds or credits for canceled orders or reservations.</ListItem>
            <ListItem>
              Customers are responsible for carefully reviewing and confirming their orders or reservations before making a purchase.
            </ListItem>
            <ListItem>
              In the event of unforeseen circumstances or issues beyond our control that result in the cancellation of an order or
              reservation, we will work with the customer to find an alternative solution or provide a suitable substitute if available.
            </ListItem>
            <ListItem>
              Changes to an order or reservation may be considered on a case-by-case basis, subject to our discretion. Additional charges or
              fees may apply for any modifications made.
            </ListItem>
          </UnorderedList>
        </Box>
        <Divider my={4} />

        <Box>
          <Heading>Returns, Refunds and Cancellation </Heading>
          <UnorderedList m={5} spacing={2}>
            <ListItem>
              We strive to ensure that our products are of the highest quality and meet your expectations. If, however, you receive a
              damaged or defective product, please contact us within [number of days] days of receiving the item.
            </ListItem>
            <ListItem>We do not accept returns or provide refunds for products unless they are damaged or defective.</ListItem>
            <ListItem>We do not accept cancellation.</ListItem>
            <ListItem>
              To request a return or refund, please provide us with detailed information and supporting evidence such as photographs clearly
              showing the damage or defect.
            </ListItem>
            <ListItem>
              Once we have assessed the issue and confirmed the eligibility for a return or refund, we will provide you with further
              instructions on the return process.
            </ListItem>
            <ListItem>
              Refunds will be processed using the original payment method and may take up to [number of days] days to be credited back to
              your account.
            </ListItem>
            <ListItem>
              We reserve the right to refuse a return or refund if the damage or defect is determined to be a result of misuse, negligence,
              or improper installation.
            </ListItem>
          </UnorderedList>

          <Box display={"flex"} gap={5} alignItems={"center"}>
            <InfoOutlineIcon boxSize={8} />

            <Heading>IMPORTANT</Heading>
          </Box>

          <Text m={5}>
            {" "}
            Please note that any customized or made-to-order products may not be eligible for return or refund unless they are damaged or
            defective. We encourage you to thoroughly review the product specifications and consult with our team before placing an order
            for customized items.
          </Text>
          <Text m={5}>
            We are committed to resolving any issues promptly and ensuring your satisfaction with our products and services. If you have any
            questions or concerns regarding returns or refunds, please don't hesitate to contact our customer support team.
          </Text>
        </Box>
        <Divider my={4} />

        <Box>
          <Heading>Links to Third-Party Websites</Heading>
          <Text m={5}>
            Our website may contain links to third-party websites. These links are provided for your convenience and do not signify our
            endorsement of the content or policies of those websites. We have no control over the nature, content, and availability of those
            sites. Therefore, we are not responsible for any damages or losses arising from your use of third-party websites.
          </Text>
        </Box>
        <Divider my={4} />
        <Box>
          <Heading>Limitation of Liability</Heading>
          <Text m={5}>
            To the fullest extent permitted by applicable law, in no event shall Creative Wallpapers, its directors, employees, agents, or
            affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way
            connected with
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Toc;
