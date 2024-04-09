import { Flex, Button, HStack, chakra } from "@chakra-ui/react";
import Link from "next/link";
import styles from "@/styles/Layout.module.css";

const CTA = "Get Started";
export default function Header() {
  const data = [
    { name: "short url", url: "/" },
    { name: "validate url", url: "validate" },
  ];

  return (
    <chakra.header id="header">
      <Flex w="100%" px="6" py="5" align="center" justify="space-between">
        <HStack as="nav" spacing="5">
          {data.map((item) => (
            <Link href={item.url} key={item.name}>
              <Button
                variant="nav"
                colorScheme="whiteAlpha"
                className={styles.sections}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </HStack>
        <HStack>
          <Button aria-label={CTA} colorScheme="whiteAlpha">
            {CTA}
          </Button>
        </HStack>
      </Flex>
    </chakra.header>
  );
}
