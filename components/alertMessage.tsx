import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from '@chakra-ui/react';
import { useAlert } from '../contexts/AlertContext';

const AlertMessage = () => {
  const { alert, type } = useAlert();

  if (alert === null) {
    return null;
  }
  const state = type

  return (
    <Box
      position="fixed"
      top="5%"
      left="50%"
      transform="translate(-50%, -50%)"
      maxWidth="680px"
      zIndex="999"
      width="90%" // adjust as needed
    >
      <Alert status={type}>
        <AlertIcon />
        <AlertTitle>{alert}</AlertTitle>
      </Alert>
    </Box>
  );
};

export default AlertMessage;
