import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Image,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Avatar,
  SimpleGrid,
  Divider,
  Alert,
  AlertIcon,
  Menu,
  MenuButton,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { FiShoppingCart } from "react-icons/fi";
import React from "react";
import { useUserContext } from "@/context/UserSchema";
import { urlFor } from "@/lib/client";
import axios from "axios";
import { signOut } from "next-auth/react";

function DrawerExample({ func }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { user, cartItems, setTotalPrice, totalPrice, successPayemnt } = useUserContext();
  const toast = useToast();

  if (isOpen) {
    setTotalPrice(cartItems && cartItems.reduce((total, item) => total + item.price * item.quantity, 0));
  }

  const makePayment = async () => {
    if (user.shippingAddress == "" || user.pinCode == ""  || user.City == "") {
      return toast({
        title: (
          <Text>Complete Your profile before filling order <Link href={'/user/Account'}>Click here</Link></Text>
        ),
        status: "error",
        duration: 9000,
        isClosable: false
      })
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
        await successPayemnt(
          response.razorpay_payment_id,
          cartItems.map((item) => ({ id: item._id, quantity: item.quantity }))
        );
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

  return (
    <>
      <Button aria-label='Toggle Color Mode' _focus={{ boxShadow: "none" }} w='fit-content' ref={btnRef} onClick={onOpen}>
        <FiShoppingCart />
      </Button>
      <Drawer size={"lg"} isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>

          <DrawerBody>
            {user.name == "Guest" ? (
              <Alert status='warning'>
                <AlertIcon />
                You need to sign up to access your cart
              </Alert>
            ) : (
              <>
                <Input placeholder='Type here...' />
                {cartItems &&
                  cartItems.map((item) => (
                    <Box key={item?.name} py={4}>
                      <SimpleGrid alignItems='center' templateColumns='repeat(3, 1fr)'>
                        <Image borderRadius='10%' w='50%' src={urlFor(item?.image[0])} />
                        <Box>
                          <h1 style={{ margin: "5% 0 5% 0" }}>{item?.name}</h1>
                          <p>Quantity: {item?.quantity}</p>
                        </Box>
                        <Box>
                          <p>Price: {item?.price} Rs</p>
                          <Button my={3} colorScheme='red' mr={2} onClick={() => func(item, item?.slug?.current)}>
                            Remove
                          </Button>
                        </Box>
                      </SimpleGrid>
                      <Divider my={2} />
                    </Box>
                  ))}
              </>
            )}
          </DrawerBody>

          <DrawerFooter bgColor={"#071429"}>
            <Box w={"full"}>
              <Box display={"flex"} justifyContent={"space-around"}>
                <Text>Total: </Text>
                <Text>{totalPrice}</Text>
              </Box>
              <Divider my={2} />
              <Box display={"flex"} justifyContent={"flex-end"}>
                <Button variant='outline' mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={makePayment} colorScheme='blue'>
                  Buy Now
                </Button>
              </Box>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default function WithSubnavigation() {
  const { user, onRemove } = useUserContext();

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={"gray.800"}
        color={"white"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.900"}
        align={"center"}>
        <Flex flex={{ base: 1, md: "auto" }} ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }} align={"center"}>
          <Link textDecoration={"none"} href={"/"}>
            <Image src='/Images/CreativeWallpapers.png' w={50} />
          </Link>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack zIndex={5} flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6} align={"center"}>
          <DrawerExample func={onRemove} />
          {(() => {
            if (user.name == "Guest") {
              return (
                <Button
                  as={"a"}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"pink.400"}
                  href={"/user/signIn"}
                  _hover={{
                    bg: "pink.300",
                  }}>
                  Sign Up
                </Button>
              );
            } else {
              return (
                <Menu>
                  <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                    <Avatar size={"md"} src={user.image} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar size={"2xl"} src={user.image} />
                    </Center>
                    <br />
                    <Center>
                      <p>{user.name}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>
                      <Link href='/user/Account'>Account Settings</Link>
                    </MenuItem>
                    {user.access ? (
                      <MenuItem>
                        <Link href='/admin/Hub'>Admin Panel</Link>
                      </MenuItem>
                    ) : null}
                    <MenuItem>
                      <Button onClick={signOut}>Sign Out</Button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              );
            }
          })()}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = "gray.200";
  const linkHoverColor = "white";
  const popoverContentBgColor = "gray.800";

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent border={0} boxShadow={"xl"} bg={popoverContentBgColor} p={4} rounded={"xl"} minW={"sm"}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link href={href} role={"group"} display={"block"} p={2} rounded={"md"} _hover={{ bg: "gray.900" }}>
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text transition={"all .3s ease"} _groupHover={{ color: "pink.400" }} fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}>
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={"gray.800"} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}>
        <Text fontWeight={600} color={"gray.200"}>
          {label}
        </Text>
        {children && (
          <Icon as={ChevronDownIcon} transition={"all .25s ease-in-out"} transform={isOpen ? "rotate(180deg)" : ""} w={6} h={6} />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack mt={2} pl={4} borderLeft={1} borderStyle={"solid"} borderColor={"gray.700"} align={"start"}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Orders",
    children: [
      {
        label: "Current Orders",
        subLabel: "Up-and-coming placed order",
        href: "#",
      },
      {
        label: "Order History",
        subLabel: "History of all previous orders",
        href: "/user/Account/#orderHistory",
      },
    ],
  },
  {
    label: "Follow Us",
    children: [
      {
        label: "Youtube",
        subLabel: "Experience Daythough & Client reviews blogs",
        href: "https://www.youtube.com/@creativewallpapers",
      },
      {
        label: "Instagram",
        subLabel: "To stay updated with upcoming offers and trends",
        href: "https://www.instagram.com/creativewallsstudio/",
      },
    ],
  },
  {
    label: "Contact Us",
    children: [
      { label: "Phone", subLabel: "Make a phone call today!", href: "tel:+918800179641" },
      { label: "Email", subLabel: "Write us a email", href: "mailto:creativewallsstudio@gmail.com" },
      {
        label: "Visit Us",
        subLabel: "Visit our store!",
        href: "https://www.google.co.uk/maps/place/Creative+wallpapers/@28.6805357,77.1441707,17z/data=!3m1!4b1!4m6!3m5!1s0x390d03f5151a7011:0x99d05133a9d7b68e!8m2!3d28.680531!4d77.146751!16s%2Fg%2F11rr795lc7?entry=ttu",
      },
    ],
  },
  {
    label: "About Us",
    href: "/#aboutus",
  },
];
