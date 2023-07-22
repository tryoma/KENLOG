import { HStack, SpaceProps, Tag } from '@chakra-ui/react';

interface IRecordTags {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
}

export const RecordTags: React.FC<IRecordTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};
