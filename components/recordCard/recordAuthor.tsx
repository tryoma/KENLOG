import { HStack, Image, Text } from '@chakra-ui/react';

interface RecordAuthorProps {
  date: Date;
  name: string;
  image: string;
}

export const RecordAuthor: React.FC<RecordAuthorProps> = (props) => {
  const { date, name, image } = props;
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src={image}
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{name}</Text>
      <Text>—</Text>
      <Text>{date.toLocaleDateString()}</Text>
    </HStack>
  );
};
