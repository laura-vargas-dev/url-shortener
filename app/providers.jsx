"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </SessionProvider>
  );
}