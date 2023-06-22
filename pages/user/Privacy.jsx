import { Text, Heading, Box, Divider, ListItem, UnorderedList, OrderedList, Link } from "@chakra-ui/react";

const Privacy = () => {
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
          This Privacy Policy outlines how Creative Wallpapers collects, uses, and protects any personal information that you provide when
          using our website. We are committed to ensuring the privacy and security of your personal information and complying with
          applicable data protection laws. By using our website, you consent to the collection and use of your personal information as
          described in this Privacy Policy.
        </Text>
        <Divider my={4} />
        <Box>
          <Heading>Information We Collect</Heading>
          <UnorderedList m={5} spacing={2}>
            <ListItem>
              {" "}
              Personal Information: When you use our website, we may collect personal information such as your name, email address, phone
              number, and mailing address. We collect this information when you voluntarily provide it to us, such as when you place an
              order, contact us, or subscribe to our newsletter.
            </ListItem>
            <ListItem>
              Non-Personal Information: We may also collect non-personal information about your usage of our website, such as your IP
              address, browser type, operating system, and website activity. This information is collected using cookies and similar
              technologies and is used to improve our website's functionality and enhance your browsing experience.
            </ListItem>
          </UnorderedList>
        </Box>
        <Divider my={4} />
        <Box>
          <Heading>Use of Collected Information</Heading>
          <OrderedList m={5} spacing={2}>
            <ListItem> We collect and use your personal information for the following purposes:</ListItem>
            <UnorderedList m={5} spacing={2}>
              <ListItem>Processing and fulfilling your orders</ListItem>
              <ListItem>
                Communicating with you about your orders, inquiries, or requests Providing customer support and resolving issues
              </ListItem>
              <ListItem>Sending promotional emails, newsletters, or marketing materials (if you have opted in to receive them)s</ListItem>
              <ListItem>Customizing and improving our products, services, and website</ListItem>
              <ListItem>Analyzing website usage and trends to enhance user experience</ListItem>
            </UnorderedList>
            <ListItem>
              We may share your personal information with trusted third-party service providers who assist us in operating our website,
              conducting our business, or servicing you. These third parties are required to maintain the confidentiality of your
              information and are prohibited from using it for any other purpose.
            </ListItem>
          </OrderedList>
        </Box>
        <Divider my={4} />
        <Box>
          <Heading>Data Security</Heading>
          <UnorderedList m={5} spacing={2}>
            <ListItem>
              We are committed to ensuring the security of your personal information. We implement appropriate physical, electronic, and
              managerial procedures to safeguard and secure the information we collect online.
            </ListItem>
            <ListItem>
              However, please note that no method of transmission over the internet or electronic storage is 100% secure. While we strive to
              protect your personal information, we cannot guarantee its absolute security.
            </ListItem>
          </UnorderedList>
        </Box>
        <Divider my={4} />
        <Box>
          <Heading>Third-Party Links</Heading>
          <Text m={5}>
            Our website may contain links to third-party websites. Please note that we do not have control over these websites and are not
            responsible for their privacy practices. We encourage you to review the privacy policies of these third-party websites before
            providing any personal information.
          </Text>
        </Box>
        <Divider my={4} />
        <Box>
          <Heading>Your Rights</Heading>
          <UnorderedList m={5} spacing={2}>
            <ListItem>
            You have the right to access, update, or delete your personal information held by us. If you would like to exercise any of these rights, please contact us using the information provided below.
            </ListItem>
            <ListItem>
            You may also unsubscribe from our marketing communications at any time by following the instructions provided in the emails or contacting us directly.
            </ListItem>
          </UnorderedList>
        </Box>
        <Divider my={4} />
        <Box>
          <Heading>Changes to the Privacy Policy</Heading>
          <Text m={5}>
          We reserve the right to update or modify this Privacy Policy at any time without prior notice. Any changes will be effective immediately upon posting the updated Privacy Policy on our website. It is your responsibility to review this Privacy Policy periodically for any updates.
          </Text>
        </Box>
        <Divider my={4} />
        <Box>
          <Heading>Contact Us</Heading>
          <Text m={5}>
          If you have any questions or concerns regarding this Privacy Policy or the handling of your personal information, please contact us at <Link href="mailto:creativewallsstudio@gmail.com" color={'teal.400'}>Our Email.</Link>
          </Text>
        </Box>
        <Divider my={4} />
      </Box>
    </Box>
  );
};

export default Privacy;
