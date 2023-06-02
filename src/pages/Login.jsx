import React from "react";

import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwrite-config";

function Login() {
  const {
    handleSubmit,
    register,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  async function loginHandler(values) {
    console.log(values);

    const promise = account.createEmailSession(values.email, values.password);

    promise.then(
      (response) => {
        // verifyEmail();
        navigate("/dashboard");
      },
      (error) => console.log(error)
    );

    // async function verifyEmail() {
    //   const promise = account.createVerification(
    //     "http://localhost:3000/dashboard"
    //   );

    //   promise.then(
    //     (response) => console.log(response),
    //     (error) => console.log(error)
    //   );
    // }
  }

  return (
    <Flex
      minH={"100vh"}
      minW={"100vw"}
      bgColor={"dark"}
      justifyContent={"center"}
      placeItems={"center"}
      p={5}
    >
      <Flex
        flexDir="column"
        justifyContent={"center"}
        alignItems={"center"}
        gap={8}
      >
        {/* Heading */}
        <Heading color={"primary"} textAlign={"center"} size={"3xl"}>
          ExpenseCare
        </Heading>

        {/* Form */}

        <form onSubmit={handleSubmit(loginHandler)}>
          {/* email */}
          <Flex
            flexDir={"column"}
            gap={2}
            bgColor={"lightgray"}
            color={"whiteAlpha.900"}
            p={10}
            rounded={"xl"}
          >
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                w={"xs"}
                type="email"
                {...register("email", { required: "email is required" })}
              />

              {errors.email ? (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              ) : (
                <FormHelperText>Enter registered email address</FormHelperText>
              )}
            </FormControl>

            {/* set password */}

            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                {...register("password", {
                  required: "password must not be empty",
                  minLength: "minimum password length must be eight",
                })}
              />
              {errors.password ? (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              ) : (
                <FormHelperText>password can be alphanumeric</FormHelperText>
              )}
            </FormControl>

            {/* Login button */}
            <Button colorScheme="teal" width={"full"} type="submit" my={2}>
              Login
            </Button>
            <Text textAlign={"center"}>Or</Text>

            {/* Google Login button */}
            <Button colorScheme="blue" width={"full"} mb={4}>
              Login using Google
            </Button>

            {/* Link to Signup */}

            <Text textAlign={"center"}>
              Not a User?{" "}
              <Link
                as={RouteLink}
                to={"/signup"}
                color={"primary"}
                fontWeight={"semibold"}
              >
                Signup
              </Link>
            </Text>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
}

export default Login;
