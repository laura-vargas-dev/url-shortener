import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useRef, useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function Home() {
  const inputRef = useRef();
  const toast = useToast();
  const toastIdRef = useRef();
  const { data: session } = useSession();
  const [shortUrl, setShortUrl] = useState(null);

  const handleSubmit = (e) => {
    const currentUrl = window.location.href;
    e.preventDefault();
    const email = session?.user?.email || null;
    const url = "https://" + inputRef.current.value;
    fetch("/api/shortUrl", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ url, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setShortUrl(currentUrl + data.shortUrl);
        } else {
          showToast(data.error, "error");
        }
      });
  };

  const showToast = (description, status) => {
    toastIdRef.current = toast({
      description: description,
      status: status,
      isClosable: true,
    });
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(shortUrl);
    showToast("Copied!", "success");
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>URL Shortener</h1>
      <p className={styles.description}>
        The Short Link Service is a website where you can significantly shorten
        any link while still functioning exactly like the original long link.
        With just one click, you can shorten the long URL.
      </p>
      <Stack spacing={4}>
        <InputGroup>
          <InputLeftAddon background="#924dbf">https://</InputLeftAddon>
          <Input
            _placeholder={{ color: "inherit" }}
            placeholder="Url"
            ref={inputRef}
            id="url"
            name="url"
            autoComplete="off"
            w="100%"
            color="#4a2574"
            background="#fff"
            focusBorderColor="#924dbf"
            required
          />
          <InputRightElement width="4.5rem" background="#924dbf">
            <Button
              h="1.75rem"
              size="sm"
              colorScheme="whiteAlpha"
              onClick={handleSubmit}
            >
              Short
            </Button>
          </InputRightElement>
        </InputGroup>
      </Stack>
      {shortUrl !== null && (
        <Stack spacing={4} mt="4">
          <InputGroup>
            <InputLeftAddon background="#924dbf">Short url</InputLeftAddon>
            <Input
              value={shortUrl}
              placeholder="Short url"
              id="url"
              name="url"
              color="#4a2574"
              background="#fff"
              focusBorderColor="#924dbf"
              readOnly
              required
            />
            <InputRightElement width="4.5rem" background="#924dbf">
              <Button
                h="1.75rem"
                size="sm"
                onClick={copyUrl}
                colorScheme="whiteAlpha"
              >
                Copy
              </Button>
            </InputRightElement>
          </InputGroup>
          {!session && (
            <p className={styles.descriptionAlert}>
              If you want to manage your shortened urls, please log in.
            </p>
          )}
        </Stack>
      )}
    </main>
  );
}
