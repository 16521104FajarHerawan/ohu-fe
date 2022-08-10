import { Box, Center, Text, Circle, VStack, HStack } from '@chakra-ui/react';

const Footer = () => {
  // TODO: Ubah kalau dah ada content footernya
  return (
    <Box bg="#ffa06e" px={4} py={6}>
      <VStack
        spacing={{ base: '20px', lg: '20px' }}
        mt={{ base: '0px', lg: '20px' }}
      >
        <HStack spacing={{ base: '17px', lg: '30px' }}>
          <Circle size={{ base: '91px', lg: '186px' }} bg="#D9D9D9"></Circle>
          <Box
            fontFamily="Subheading"
            fontSize={{ base: '36px', lg: '73px' }}
            lineHeight={{ base: '33.12px', lg: '67.16px' }}
          >
            <Text>KAT</Text>
            <Text>ITB</Text>
            <Text>2022</Text>
          </Box>
        </HStack>
        <Center bg="#D9D9D9" w="100%" h="13em"></Center>
      </VStack>
    </Box>
  );
};

export default Footer;
