import { Container, Flex, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Container>
      <Flex
        mx="auto"
        d="column"
        align="center"
        justify="center"
        textAlign="center"
      >
        <Text fontSize="sm" color="gray.500">
          Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          by{" "}
          <Link href="//github.com/laura-vargas-dev/url-shortener">
            Laura Vargas
          </Link>
        </Text>
      </Flex>
    </Container>
  );
}
