import { Container, Flex, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Container minWidth='100%' position="fixed" bottom="0" padding="1rem">
      <Flex
        mx="auto"
        d="column"
        align="center"
        justify="center"
        textAlign="center"
      >
        <Text fontSize="sm" color="#fff">
          Made with <span aria-label="love">❤️</span> by{" "}
          <Link href="//github.com/laura-vargas-dev/url-shortener">
            Laura Vargas
          </Link>
        </Text>
      </Flex>
    </Container>
  );
}
