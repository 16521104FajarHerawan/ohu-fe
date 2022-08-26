import {
  Box,
  Button,
  Flex,
  FormLabel,
  Image,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  Icon
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { PageLayout } from 'src/layout';
import Logo from '@assets/logo_sementara.png';
import {
  AiFillLock,
  AiOutlineUser,
  AiOutlineEye,
  AiOutlineEyeInvisible
} from 'react-icons/ai';

export const LoginPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorText, setErrorText] = useState('');
  const [passwordIsShown, setPasswordIsShown] = useState(false);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const username = usernameRef.current?.value;

    if (!username) {
      setErrorText('Masukkan NIM kamu!');

    }

    // auth logic here
  };

  const toggleShowPassword = () => {
    setPasswordIsShown(!passwordIsShown);
  };

  return (
    <PageLayout title="Login">
      <Flex justifyContent="center" mt="2em" alignItems="center">
        <Image
          src={Logo}
          w={['5em', '10em']}
          objectFit="contain"
          mr={{ base: 0, md: 2 }}
          mb={{ base: 2, md: 0 }}
          transition="all 0.15s ease-in-out"
        />
        <Text
          fontSize={['2em', '3em']}
          fontFamily="Heading"
          color="#F4A641"
          transition="all 0.15s ease-in-out"
          textShadow="-1px -2px 0px #000000"
        >
          OHU 2022
        </Text>
      </Flex>

      <Box
        border="2px solid #FFA06F"
        w="min(20em,80%)"
        p="1.2em"
        m="auto"
        mt="1em"
        fontSize="2em"
        fontFamily="Subheading"
        bg="white"
        borderRadius="10px"
      >
        <Flex gap="2">
          <AiOutlineUser size={25} />
          <FormLabel fontSize="xl">NIM / No. Registrasi</FormLabel>
        </Flex>
        <Input
          type="text"
          ref={usernameRef}
          placeholder="Enter NIM/No. Registrasi"
        />
        <Flex mt="1em" gap="2">
          <AiFillLock size={25} />
          <FormLabel fontSize="xl">Password</FormLabel>
        </Flex>
        <Flex mt="0.4em">
          <InputGroup>
            <Input
              type={passwordIsShown ? 'text' : 'password'}
              placeholder="Enter password"
              ref={passwordRef}
            />
            <InputRightElement>
              <Icon
                as={passwordIsShown ? AiOutlineEyeInvisible : AiOutlineEye}
                onClick={toggleShowPassword}
                cursor="pointer"
                fontSize="xl"
              />
            </InputRightElement>
          </InputGroup>
        </Flex>

        <Text fontFamily="Subheading" fontSize="lg" mt={2} color="salmon">
          {errorText}
        </Text>
        <Flex w="100%" justifyContent="flex-end">
          <Button
            onClick={submitHandler}
            _hover={{ backgroundColor: '#FFB08D' }}
            mt="1em"
          >
            Login
          </Button>
        </Flex>
      </Box>
    </PageLayout>
  );
};
