import Featured from "@/components/Featured";
import HeroBanner from "@/components/HeroBanner";
import PlacedOrder from "@/components/PlacedOrder";
import ProductAddToCart from "@/components/Product";
import Reviews from "@/components/Reviews";
import { client } from "@/lib/client";
import { Center, Text, Link, Button } from "@chakra-ui/react";

export default function Home({ featured, HomePageProduct }) {

  return (
    <>
      <HeroBanner />
      <Featured props={featured} />
      <Center mt={5}>
        <Text fontSize={"4vh"} fontWeight={"bold"}>
          New Products
        </Text>
      </Center>
      <ProductAddToCart products={HomePageProduct} />
      <Center>
        <Link href={"/products/All"}>
          <Button
            px={8}
            bg={"whitesmoke"}
            color={"black"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}>
            Explore More Wallpapers
          </Button>
        </Link>
      </Center>
      <PlacedOrder />
      <Reviews />
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "featured"]';
  const featured = await client.fetch(query);

  const HomePageProductQuery = '*[_type == "product" && isNew == true || _type == "product"][0...4]';
  const HomePageProduct = await client.fetch(HomePageProductQuery);

  return {
    props: { featured, HomePageProduct },
  };
};
