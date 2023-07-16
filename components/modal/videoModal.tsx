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
} from '@chakra-ui/react';
import { FrontendRecord } from '../../types/frontendedRecord';

interface videoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: FrontendRecord | null;
}

export default function VideoModal(props: videoModalProps) {
  const { isOpen, onClose, video } = props;

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
