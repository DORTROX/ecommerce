import { useFilterContext } from "@/context/FilterSchema";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Center,
  CheckboxGroup,
  Grid,
  Checkbox,
  Heading,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Link,
  MenuItem,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const FiltersX = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { addColorQuery, addDesignQuery, addMaterialQuery, query } =
    useFilterContext();

  const [isExpanded, setisExpanded] = useState({
    wall_Design: false,
    wall_color: false,
    wall_material: false,
  });

  return (
    <>
      <Flex
        py={5}
        // display={{ base: "block", md: "flex" }}
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        <Button
          rightIcon={<HiChevronDown />}
          colorScheme="blue"
          onClick={onOpen}
        >
          Search Filters
        </Button>
        <Menu>
          <MenuButton as={Button} rightIcon={<HiChevronDown />}>
            Sort By
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => props.props("MREV")}>Most Reviewed</MenuItem>
            <MenuItem onClick={() => props.props("MRAT")}>Most Rated</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Drawer
        placement={"bottom"}
        onClose={onClose}
        isOpen={isOpen}
        size={"xl"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Filter</DrawerHeader>
          <DrawerBody>
            <CheckboxGroup colorScheme="green">
              <Center h={10} my={5}>
                <Heading size={"lg"}>Wallpaper Designs</Heading>
              </Center>
              <Grid
                transition={"0.2s all"}
                overflowY={isExpanded.wall_Design == true ? "scroll" : "hidden"}
                maxHeight={isExpanded.wall_Design == true ? "15vh" : "5vh"}
                w={"80%"}
                m={"0% auto"}
                templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
              >
                <Checkbox
                  onChange={() => addDesignQuery(event.target.value)}
                  value="Abstract"
                >
                  Abstract
                </Checkbox>
                <Checkbox
                  onChange={() => addDesignQuery(event.target.value)}
                  value="3D"
                >
                  3D
                </Checkbox>
                <Checkbox
                  onChange={() => addDesignQuery(event.target.value)}
                  value="Animal"
                >
                  Animal
                </Checkbox>
                <Checkbox
                  onChange={() => addDesignQuery(event.target.value)}
                  value="Birds"
                >
                  Birds
                </Checkbox>
                <Checkbox
                  onChange={() => addDesignQuery(event.target.value)}
                  value="Blue Stone"
                >
                  Blue Stone
                </Checkbox>
                <Checkbox
                  onChange={() => addDesignQuery(event.target.value)}
                  value="Books"
                >
                  Books
                </Checkbox>
                <Checkbox
                  onChange={() => addDesignQuery(event.target.value)}
                  value="Bricks"
                >
                  Bricks
                </Checkbox>
                <Checkbox
                  onChange={() => addDesignQuery(event.target.value)}
                  value="Ethnic"
                >
                  Ethnic
                </Checkbox>
                <Checkbox
                  onChange={() => addDesignQuery(event.target.value)}
                  value="Floral"
                >
                  Floral
                </Checkbox>
                <Checkbox
                  onChange={() => addDesignQuery(event.target.value)}
                  value="Flower"
                >
                  Flower
                </Checkbox>
                <Checkbox
                  onChange={() => addDesignQuery(event.target.value)}
                  value="Geometric"
                >
                  Geometric
                </Checkbox>
                <Checkbox
                  onChange={() => addDesignQuery(event.target.value)}
                  value="Kids"
                >
                  Kids
                </Checkbox>
                <Checkbox
                  onChange={() => addDesignQuery(event.target.value)}
                  value="Leaves"
                >
                  Leaves
                </Checkbox>
                <Checkbox
                  onChange={() => addDesignQuery(event.target.value)}
                  value="Vintage"
                >
                  Vintage
                </Checkbox>
                <Checkbox
                  onChange={() => addDesignQuery(event.target.value)}
                  value="Wood"
                >
                  Wood
                </Checkbox>
              </Grid>

              {isExpanded.wall_Design == true ? (
                <Center my={4}>
                  <Button
                    my={2}
                    margin={"0 auto"}
                    px={8}
                    bg={"whitesmoke"}
                    color={"black"}
                    rounded={"md"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setisExpanded({
                        wall_Design: false,
                        wall_color: false,
                        wall_material: false,
                      })
                    }
                  >
                    View Less
                  </Button>
                </Center>
              ) : (
                <Center my={4}>
                  <Button
                    my={2}
                    margin={"0 auto"}
                    px={8}
                    bg={"whitesmoke"}
                    color={"black"}
                    rounded={"md"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setisExpanded({
                        wall_Design: true,
                        wall_color: false,
                        wall_material: false,
                      })
                    }
                  >
                    View More
                  </Button>
                </Center>
              )}
            </CheckboxGroup>
            <CheckboxGroup colorScheme="green">
              <Divider />

              <Center h={10} my={5}>
                <Heading size={"lg"}>Wallpaper Color Pallets</Heading>
              </Center>
              <Grid
                transition={"0.2s all"}
                overflowY={isExpanded.wall_color == true ? "scroll" : "hidden"}
                maxHeight={isExpanded.wall_color == true ? "20vh" : "10vh"}
                w={"90%"}
                m={"0% auto"}
                templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
              >
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Coral and Mint"
                >
                  Coral and Mint
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Teal and Gray"
                >
                  Teal and Gray
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Navy and Mustard"
                >
                  Navy and Mustard
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Burgundy and Beige"
                >
                  Burgund onChange={() => addColorQuery(event.target.value)}y
                  and Beige
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Olive and Rust"
                >
                  Olive and Rust
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Turquoise and Coral"
                >
                  Turquoise
                  and Coral
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Lavender and Mint"
                >
                  Lavender and Mint
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Gray and Mustard"
                >
                  Gray and Mustard
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Navy and Blush"
                >
                  Navy and Blush
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Olive and Mauve"
                >
                  Olive and Mauve
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Coral and Gray"
                >
                  Coral and Gray
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Rust and Cream"
                >
                  Rust and Cream
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Navy and Sage"
                >
                  Navy and Sage
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Mustard and Maroon"
                >
                  Mustard and
                  Maroon
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Teal and Beige"
                >
                  Teal and Beige
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Burgundy and Olive"
                >
                  Burgundy
                  and Olive
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Blush and Gray"
                >
                  Blush and Gray
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Mint and Taupe"
                >
                  Mint and Taupe
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Coral and Navy"
                >
                  Coral and Navy
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Sage and Mustard"
                >
                  Sage and Mustard
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Burgundy and Gray"
                >
                  Burgundy and Gray
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Olive and Taupe"
                >
                  Olive and Taupe
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Navy and Rust"
                >
                  Navy and Rust
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Coral and Beige"
                >
                  Coral and Beige
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Mustard and Olive"
                >
                  Mustard and Olive
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Teal and Cream"
                >
                  Teal and Cream
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Gray and Blush"
                >
                  Gray and Blush
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Rust and Beige"
                >
                  Rust and Beige
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Olive and Blush"
                >
                  Olive and Blush
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Navy and Beige"
                >
                  Navy and Beige
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Coral and Sage"
                >
                  Coral and Sage
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Mustard and Burgundy"
                >
                  Mustard and
                  Burgundy
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Teal and Blush"
                >
                  Teal and Blush
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Gray and Olive"
                >
                  Gray and Olive
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Burgundy and Taupe"
                >
                  Burgundy
                  and Taupe
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Rust and Olive"
                >
                  Rust and Olive
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Navy and Cream"
                >
                  Navy and Cream
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Coral and Rust"
                >
                  Coral and Rust
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Sage and Olive"
                >
                  Sage and Olive
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Mustard and Gray"
                >
                  Mustard and Gray
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Teal and Navy"
                >
                  Teal and Navy
                </Checkbox>
                <Checkbox
                  onChange={() => addColorQuery(event.target.value)}
                  value="Blush and Taupe"
                >
                  Blush and Taupe
                </Checkbox>
              </Grid>
              {isExpanded.wall_color == true ? (
                <Center my={4}>
                  <Button
                    px={8}
                    bg={"whitesmoke"}
                    color={"black"}
                    rounded={"md"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setisExpanded({
                        wall_Type: false,
                        wall_color: false,
                        wall_material: false,
                      })
                    }
                  >
                    View Less
                  </Button>
                </Center>
              ) : (
                <Center my={4}>
                  <Button
                    px={8}
                    bg={"whitesmoke"}
                    color={"black"}
                    rounded={"md"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setisExpanded({
                        wall_Type: false,
                        wall_color: true,
                        wall_material: false,
                      })
                    }
                  >
                    View More
                  </Button>
                </Center>
              )}
            </CheckboxGroup>
            <CheckboxGroup colorScheme="green">
              <Divider />
              <Center h={10} my={5}>
                <Heading size={"lg"}>Wallpaper Materials</Heading>
              </Center>
              <Grid
                transition={"0.2s all"}
                overflowY={
                  isExpanded.wall_material == true ? "scroll" : "hidden"
                }
                maxHeight={isExpanded.wall_material == true ? "20vh" : "10vh"}
                w={"90%"}
                m={"0% auto"}
                templateColumns={{ base: "1fr", md: "repeat(4,1fr)" }}
              >
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="200gsm Royal Touch Wallpaper"
                >
                  200gsm Royal Touch Wallpaper
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Acrylic"
                >
                  Acrylic
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Aluminium"
                >
                  Aluminium
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Blown Vinyl"
                >
                  Blown Vinyl
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Bopp"
                >
                  Bopp
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Canvas"
                >
                  Canvas
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Epoxy"
                >
                  Epoxy
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Fabric Backed"
                >
                  Fabric Backed
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Foil"
                >
                  Foil
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Grasscloth"
                >
                  Grasscloth
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Gravure"
                >
                  Gravure
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Linen"
                >
                  Linen
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Non Woven"
                >
                  Non Woven
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Non Woven Mylar"
                >
                  Non Woven Mylar
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="PVC"
                >
                  PVC
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="PVC Vinyl"
                >
                  PVC Vinyl
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Paper"
                >
                  Paper
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Paper Back Vinyl Wallpapers"
                >
                  Paper Back Vinyl Wallpapers
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Peel &amp; Stick Vinyl Wallpaper | Greenguard Ul Gold (Usa) Certified Material | 100% Eco-Friendly, Pvc-Free, Water Repellent, Scratch-Resistant, Anti-Bacterial, And Anti-Microbial"
                >
                  Peel &amp; Stick Vinyl Wallpaper | Greenguard Ul Gold (Usa)
                  Certified Material | 100% Eco-Friendly, Pvc-Free, Water
                  Repellent, Scratch-Resistant, Anti-Bacterial, And
                  Anti-Microbial
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Peel &amp; Stick Vinyl Wallpaper, Greenguard Ul Gold (Usa) Certified Material, 100% Eco-Friendly, Pvc-Free, Water Repellent, Scratch-Resistant, Anti-Bacterial, And Anti-Microbial"
                >
                  Peel &amp; Stick Vinyl Wallpaper, Greenguard Ul Gold (Usa)
                  Certified Material, 100% Eco-Friendly, Pvc-Free, Water
                  Repellent, Scratch-Resistant, Anti-Bacterial, And
                  Anti-Microbial
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Plastic"
                >
                  Plastic
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Polypropylene"
                >
                  Polypropylene
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Polyresin"
                >
                  Polyresin
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Vinyl"
                >
                  Vinyl
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Woven"
                >
                  Woven
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Non Woven Mylar"
                >
                  Non Woven Mylar
                </Checkbox>
                <Checkbox
                  onChange={() => addMaterialQuery(event.target.value)}
                  value="Vinyl"
                >
                  Vinyl
                </Checkbox>
              </Grid>
              {isExpanded.wall_material == true ? (
                <Center my={4}>
                  <Button
                    px={8}
                    bg={"whitesmoke"}
                    color={"black"}
                    rounded={"md"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setisExpanded({
                        wall_Type: false,
                        wall_color: false,
                        wall_material: false,
                      })
                    }
                  >
                    View Less
                  </Button>
                </Center>
              ) : (
                <Center my={4}>
                  <Button
                    px={8}
                    bg={"whitesmoke"}
                    color={"black"}
                    rounded={"md"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setisExpanded({
                        wall_Type: false,
                        wall_color: false,
                        wall_material: true,
                      })
                    }
                  >
                    View More
                  </Button>
                </Center>
              )}
            </CheckboxGroup>
            <Center>
              <Link
                href={`/products/${
                  (query.design_Query && query.design_Query.length > 0) ||
                  (query.color_Query && query.color_Query.length > 0) ||
                  (query.material_Query && query.material_Query.length > 0)
                    ? `${
                        query.design_Query && query.design_Query.length > 0
                          ? `Design=${query.design_Query.map((parts) => parts)}|`
                          : ""
                      }${
                        query.color_Query && query.color_Query.length > 0
                          ? `Color=${query.color_Query.map((parts) => parts)}|`
                          : ""
                      }${
                        query.material_Query && query.material_Query.length > 0
                          ? `Material=${query.material_Query.map((parts) => parts)}`
                          : ""
                      }`
                    : "All"
                }`}             
              >
                <Button
                  px={10}
                  bg={"lightgreen"}
                  color={"black"}
                  rounded={"md"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                    cursor: "pointer",
                  }}
                >
                  Search
                </Button>
              </Link>
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FiltersX;
