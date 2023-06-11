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
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwrite-config";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import { fetchData } from "../store/data-actions";
import { PropagateLoader } from "react-spinners";
import { loadingActions } from "../store/loading-slice";
import Loading from "../components/utility/Loading";

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const toast = useToast();

  async function loginHandler(values) {
    dispatch(loadingActions.setLoading(true));
    console.log(values);

    const promise = account.createEmailSession(values.email, values.password);

    promise.then(
      (response) => {
        // verifyEmail();
        const { userId, $id: sessionId, providerUid: userEmail } = response;
        console.log(response);
        dispatch(authActions.setUserData({ userId, sessionId, userEmail }));
        dispatch(fetchData(response.userId));
        dispatch(loadingActions.setLoading(false));
        navigate("/dashboard");
        toast({
          title: "Logged in Successfully",
          status: "success",
          colorScheme: "teal",
        });
      },
      (error) => {
        console.log(error);
        toast({
          title: "Not able to Login",
          description: "Please provide correct and password",
          status: "error",
          colorScheme: "red",
        });
      }
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

  if (isLoading) {
    return <Loading loading={isLoading} />;
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
        <Heading color={"teal.400"} textAlign={"center"} size={"3xl"}>
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
            <Button colorScheme="pink" width={"full"} type="submit" my={2}>
              Login
            </Button>
            <Text textAlign={"center"}>Or</Text>

            {/* Google Login button */}
            <Button colorScheme="blue" width={"full"} mb={4}>
              Login using Google
            </Button>

            {/* Link to Signup */}

            <Text textAlign={"center"} fontSize={"large"}>
              Not a User?{" "}
              <Link
                as={RouteLink}
                to={"/signup"}
                color={"teal.400"}
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
