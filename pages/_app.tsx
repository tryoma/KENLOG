import { SessionProvider } from 'next-auth/react';
// import './styles.css';

import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}
