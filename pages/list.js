import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Home.module.css";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
} from "@chakra-ui/react";

export default function Validate() {
  const { data: session } = useSession();
  const [listUrl, setListUrl] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(null);
  const toastIdRef = useRef();
  const toast = useToast();

  useEffect(() => {
    setCurrentUrl(window.location.href.replace("list", ""));
    getListUrl();
  }, [session]);

  const getListUrl = async () => {
    if (session) {
      try {
        const email = session.user.email || null;
        const response = await fetch("/api/getList", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = (await response?.json()) || null;
        if (data) setListUrl(data);
      } catch (error) {
        console.error(error);
        showToast("Oops!, something went wrong...", "error");
      }
    }
  };

  const showToast = (description, status) => {
    toastIdRef.current = toast({
      description: description,
      status: status,
      isClosable: true,
    });
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>My urls shortened</h1>
      <p className={styles.description}>
        Here you find the information on the URLs that you have shortened and
        the number of times your shortened URL has been used.
      </p>
      {session && listUrl.length > 0 ? (
        <TableContainer>
          <Table variant="simple" background="#fff" color="#4a2574">
            <TableCaption>My URL'S</TableCaption>
            <Thead>
              <Tr>
                <Th>URL</Th>
                <Th>Short URL</Th>
                <Th isNumeric>Clicks</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listUrl.map((urlInfo) => (
                <Tr key={urlInfo.shortUrl}>
                  <Td>
                    <Link href={urlInfo.url}>{urlInfo.url}</Link>
                  </Td>
                  <Td>
                    <Link href={currentUrl + urlInfo.shortUrl}>
                      {currentUrl}
                      {urlInfo.shortUrl}
                    </Link>
                  </Td>
                  <Td>{urlInfo.clicks}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        "There is no information yet"
      )}
    </main>
  );
}
