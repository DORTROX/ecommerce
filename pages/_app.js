import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { FilterContext } from "@/context/FilterSchema";
import { UserContext } from "@/context/UserSchema";
import { SkeletonTheme } from "react-loading-skeleton";
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <UserContext>
        <ChakraProvider theme={theme}>
          <SkeletonTheme baseColor='#202020' highlightColor='#444'>
            <FilterContext>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </FilterContext>
          </SkeletonTheme>
        </ChakraProvider>
      </UserContext>
    </SessionProvider>
  );
}
