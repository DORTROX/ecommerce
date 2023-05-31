import FiltersX from "@/components/FiltersX";
import ProductAddToCart from "@/components/Product";
import { client } from "@/lib/client";
import { Box, Divider, Button, Center } from "@chakra-ui/react";
import React, { useState, useMemo, useEffect } from "react";

export default function ProductPage ({products, tagsC, tagsD, tagsM}) {
  const [isSorting, setisSorting] = useState("None");
  const [sortedProducts, setsortedProducts] = useState();
  const [pagination, setPagination] = useState(2);
  useEffect(() => {
    return async () => {
      setsortedProducts(products);
    };
  }, [products]);
  console.log(tagsC, tagsD, tagsM)

  useMemo(() => {
    if (isSorting === "None") return sortedProducts;
    if (isSorting === "LTH") return sortedProducts.sort((a, b) => a.price - b.price);
    if (isSorting === "HTL") return sortedProducts.sort((a, b) => b.price - a.price);
    if (isSorting === "MREV") {
      return sortedProducts.sort((a, b) => {
        const aReviewsLength = a.reviews && a.reviews.length;
        const bReviewsLength = b.reviews && b.reviews.length;
        return (bReviewsLength || 0) - (aReviewsLength || 0);
      });
    }
  }, [isSorting, sortedProducts]);
  
  const viewMore = async () => {
    try {
      let productsQuery,
        tagsD,
        tagsC,
        tagsM,
        orderQuery,
        PAGE_SIZE = 1;
      const designQuery = slug.match(/Design=([^|]*)/)?.[1].split(",");
      const colorQuery = slug.match(/Color=([^|]*)/)?.[1].split(",");
      const materialQuery = slug.match(/Material=([^|]*)/)?.[1].split(",");
      const orderClause = isSorting === "LTH" ? `order(price asc)` : isSorting === "HTL" ? `order(price desc)` : "";
      orderQuery = orderClause ? `[${pagination}...${pagination + 1 * PAGE_SIZE}] | order(price asc)`:`[${pagination}...${pagination + 1 * PAGE_SIZE}]` ; // Change end index to pagination * PAGE_SIZE
      if (slug === "All") {
        productsQuery = `*[_type == "product"] ${orderQuery}`;
        tagsC = tagsD = tagsM = "";
      } else {
        tagsD = designQuery && designQuery.length ? `(${designQuery.map((val) => `"${val}" in tagsD`).join(" || ")})` : "";
        tagsC = colorQuery && colorQuery.length ? `(${colorQuery.map((val) => `"${val}" in tagsC`).join(" || ")})` : "";
        tagsM = materialQuery && materialQuery.length ? `(${materialQuery.map((val) => `"${val}" in tagsM`).join(" || ")})` : "";
        productsQuery = `*[_type == "product" && (${tagsD || tagsC || tagsM})] ${orderQuery}`;
      }
      
      let fetchedProducts = await client.fetch(productsQuery);
      if (fetchedProducts.length === 0) return;
      setPagination((prev) => prev + 1);
      setsortedProducts((prev) =>   [...prev, ...fetchedProducts]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
        <Box>
          <FiltersX props={setisSorting} />
          <Divider />
          <ProductAddToCart products={sortedProducts} tags={[tagsC, tagsD, tagsM]} />
          <Center my={5}>
            <Button
              onClick={viewMore}
              px={8}
              bg={"whitesmoke"}
              color={"black"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Explore More Wallpapers
            </Button>
          </Center>
        </Box>
      );
}



export const getServerSideProps = async ({params: {slug}}) => {
  let productsQuery, tagsD, tagsC, tagsM;

  const designQuery = slug?.match(/Design=([^|]*)/)?.[1].split(",");
      const colorQuery = slug?.match(/Color=([^|]*)/)?.[1].split(",");
      const materialQuery = slug?.match(/Material=([^|]*)/)?.[1].split(",");  
      if (slug === "All" || slug == undefined) {
        productsQuery = `*[_type == "product"] [0...2]`;
        tagsC = tagsD = tagsM = "";
      } else {
        tagsD = designQuery && designQuery.length ? `(${designQuery.map((val) => `"${val}" in tagsD`).join(" || ")})` : "";
        tagsC = colorQuery && colorQuery.length ? `(${colorQuery.map((val) => `"${val}" in tagsC`).join(" || ")})` : "";
        tagsM = materialQuery && materialQuery.length ? `(${materialQuery.map((val) => `"${val}" in tagsM`).join(" || ")})` : ""; 
        productsQuery = `*[_type == "product" && (${tagsD || tagsC || tagsM})]`;
        console.log(tagsC,tagsD,tagsM)
      }
      const products = await client.fetch(productsQuery);
  return {
    props : {products, tagsC, tagsD, tagsM}
  }
}
