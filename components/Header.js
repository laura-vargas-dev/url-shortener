import { Flex, Button, HStack, chakra } from "@chakra-ui/react";
import Link from "next/link";

const CTA = "Get Started";
export default function Header() {
  const data = [
    { name: "short url", url: "/" },
    { name: "validate url", url: "validate" },
  ];

  return (
    <chakra.header id="header">
      <Flex w="100%" px="6" py="5" align="center" justify="space-between">
        {/* <Image src={Logo.src} h="50px" /> */}
        <HStack as="nav" spacing="5">
          {data.map((item, i) => (
            <Link href={item.url} key={i}>
              <Button variant="nav"> {item.name} </Button>
            </Link>
          ))}
        </HStack>
        <HStack>
          <Button aria-label={CTA} variant="outline">
            {CTA}
          </Button>
        </HStack>
      </Flex>
    </chakra.header>
  );
}
