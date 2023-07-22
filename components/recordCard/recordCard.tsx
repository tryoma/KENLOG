import {
  SpaceProps,
  Box,
  Heading,
  Image,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { RecordTags } from './recordTags';
import { RecordAuthor } from './recordAuthor';
import { FrontendRecord } from '../../types/frontendRecord';

interface IRecordTags {
  record: FrontendRecord;
  isMe?: boolean;
}

export const RecordCard: React.FC<IRecordTags> = (props) => {
  const {
    id,
    title,
    description,
    place,
    youtubeURL,
    userName = '',
    postDate,
    userImage = '',
  } = props.record;
  const isMe = props.isMe || false;

  return (
    <Box
      marginTop={{ base: '1', sm: '5' }}
      display="flex"
      flexDirection={{ base: 'column', sm: 'row' }}
      justifyContent="space-between"
    >
      <Box
        display="flex"
        flex="1"
        marginRight="3"
        position="relative"
        alignItems="center"
      >
        <Box
          width={{ base: '100%', sm: '85%' }}
          zIndex="2"
          marginLeft={{ base: '0', sm: '5%' }}
          marginTop="0.25rem"
        >
          <Link href={`/student/record/${id}`}>
            <Image
              borderRadius="lg"
              alt="some good alt text"
              transform="scale(1.0)"
              src={`https://img.youtube.com/vi/${youtubeURL}/sddefault.jpg`}
              objectFit="contain"
              width="100%"
              transition="0.3s ease-in-out"
              _hover={{
                transform: 'scale(1.05)',
              }}
            />
          </Link>
        </Box>
        <Box zIndex="1" width="100%" position="absolute" height="100%">
          <Box backgroundSize="20px 20px" opacity="0.4" height="100%" />
        </Box>
      </Box>
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: '3', sm: '0' }}
      >
        <RecordTags tags={['Engineering', 'Product']} />
        <Heading marginTop="1">
          <Box
            as="a"
            href="your-link-here"
            textDecoration="none"
            _hover={{ textDecoration: 'none' }}
          >
            {title}
          </Box>
        </Heading>
        <Text
          as="p"
          marginTop="2"
          color={useColorModeValue('gray.700', 'gray.200')}
          fontSize="lg"
        >
          {description}
        </Text>
        {!isMe && (
          <RecordAuthor
            name={userName}
            date={new Date(postDate)}
            image={userImage}
          />
        )}
      </Box>
    </Box>
  );
};
