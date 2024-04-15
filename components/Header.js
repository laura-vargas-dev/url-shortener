import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Flex, Button, HStack, chakra } from "@chakra-ui/react";
import styles from "@/styles/Layout.module.css";
import { useEffect, useState } from "react";

const login = "Login";
const logout = "Logout";

export default function Header() {
  const { data: session } = useSession();
  const [listUrl, setListUrl] = useState([]);

  useEffect(() => {
    if (session)
      setListUrl([
        { name: "short url", url: "/" },
        { name: "my url's", url: "list" },
      ]);
    else setListUrl([{ name: "short url", url: "/" }]);
  }, [session]);

  return (
    <chakra.header id="header">
      <Flex w="100%" px="6" py="5" justify="space-between">
        <HStack as="nav" spacing="5">
          {listUrl.map((item) => (
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
          {!session ? (
            <Button
              aria-label={login}
              colorScheme="whiteAlpha"
              onClick={() => signIn()}
            >
              {login}
            </Button>
          ) : (
            <>
              {session?.user?.name}
              <Button
                aria-label={logout}
                colorScheme="whiteAlpha"
                onClick={() => signOut()}
              >
                {logout}
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </chakra.header>
  );
}
