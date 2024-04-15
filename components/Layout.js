import styles from "@/styles/Layout.module.css";
import { Providers } from "@/app/providers";
import { Flex } from "@chakra-ui/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <Providers>
      <Head>
        <title>Self-Made URL Shortener</title>
        <meta name="description" content="URL Shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.background}>
        <Header />

        <main>
          <Flex
            w="100%"
            px="6"
            py="5"
            align="flex-start"
          >
            {children}
          </Flex>
        </main>

        <Footer />
      </div>
    </Providers>
  );
}
