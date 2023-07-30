import { SessionProvider } from 'next-auth/react';
// import './styles.css';

import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import { AlertProvider } from '../contexts/AlertContext';
import AlertMessage from '../components/alertMessage';

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <AlertProvider>
          <AlertMessage />
          <Component {...pageProps} />
        </AlertProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
