import { Box, Text, VStack } from '@chakra-ui/react';
import { Comment as CommentType } from '../types/comment';

interface CommentProps {
  comment: CommentType;
}

export default function Comment({ comment }: CommentProps) {
  return (
    <VStack align="start" spacing={2}>
      <Text fontSize="sm" color="gray.500">
        {/* {comment.user.defaultName} said: */}
      </Text>
      <Box border="1px" borderRadius="md" borderColor="gray.200" p={2} w="100%">
        <Text>{comment.comment}</Text>
      </Box>
    </VStack>
  );
}
