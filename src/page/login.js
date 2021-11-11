import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftAddon,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";

export default function Login() {
  const login = (e) => {
    e.preventDefault();
    alert("login");
    var myobj = document.querySelector(".login");
    myobj.remove();
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <div className="login fixed">
      <Flex flexDirection="column" width="100wh" height="100vh" backgroundColor="white" justifyContent="center" alignItems="center">
        <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
          <Avatar bg="teal.500" />
          <Heading color="teal.400" style={{ fontFamily: "Gilroy" }}>
            Welcome
          </Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form>
              <Stack spacing={4} p="1rem">
                <FormControl>
                  <InputGroup>
                    <InputLeftAddon>+91</InputLeftAddon>
                    <Input focusBorderColor="#38B2AC" type="tel" placeholder="Email address" />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input focusBorderColor="#38B2AC" type={showPassword ? "text" : "password"} placeholder="Password" />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText textAlign="right">
                    <Link>forgot password?</Link>
                  </FormHelperText>
                </FormControl>
                <Button borderRadius={0} onClick={login} type="submit" variant="solid" colorScheme="teal" width="full">
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          Don{"'"}t have an Account ?{" "}
          <Link color="teal.500" href="#">
            Sign Up
          </Link>
        </Box>
      </Flex>
    </div>
  );
}
