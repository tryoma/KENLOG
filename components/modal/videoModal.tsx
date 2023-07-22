import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  AspectRatio,
  VStack,
  Box,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Comment from '../comment';
import { FrontendRecord } from '../../types/frontendRecord';
import { Comment as CommentType } from '../../types/comment';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: FrontendRecord | null;
}

export default function VideoModal(props: VideoModalProps) {
  const { isOpen, onClose, video } = props;
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<CommentType[]>(
    video?.comments ?? [],
  );

  useEffect(() => {
    setComments(video?.comments ?? []);
  }, [video]);

  const toast = useToast();

  const handleNewComment = async () => {
    const response = await fetch('/api/comment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recordId: video?.id,
        comment: newComment,
      }),
    });

    if (response.ok) {
      const commentData = await response.json();
      setComments((prevComments) => [...prevComments, commentData]);

      toast({
        title: 'Comment posted.',
        description: 'Your comment has been successfully posted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setNewComment('');
    } else {
      toast({
        title: 'Failed to post comment.',
        description: 'An error occurred while posting your comment.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          {video && (
            <>
              <ModalHeader>{video.title}</ModalHeader>
              <ModalBody>
                <AspectRatio ratio={16 / 9} mb="1rem">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeURL}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </AspectRatio>
                <Text fontWeight="bold" mb="1rem">
                  {video.description}
                </Text>
                <VStack spacing={4} align="stretch">
                  <Text fontWeight="bold">Comments</Text>
                  {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}

                  <Box>
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment"
                    />
                    <Button onClick={handleNewComment}>Post comment</Button>
                  </Box>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost">Secondary Action</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
