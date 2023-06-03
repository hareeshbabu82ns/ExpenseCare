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
import { account, databases } from "../appwrite/appwrite-config";
import { ID } from "appwrite";

function Signup() {
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

  const toast = useToast();
  const navigate = useNavigate();

  async function submitHandler(values) {
    const promise = account.create(ID.unique(), values.email, values.password);

    promise.then(
      (user) => {
        console.log(user);
        toast({
          title: "Account Created Successfully",
          description: "Email Verification will be required in future",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        const loginPromise = account.createEmailSession(
          values.email,
          values.password
        );
        loginPromise.then(
          (response) => {
            console.log(response);
            createUserDocument(user.$id, user.email);
            navigate("/dashboard");
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    );

    // const verify = account.createVerification("http://localhost:3000/verify");

    // verify.then(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // );

    async function createUserDocument(userId, userEmail) {
      await databases.createDocument(
        import.meta.env.VITE_DB_ID,
        import.meta.env.VITE_DB_USER_ID,
        userId,
        {
          email: userEmail,
        }
      );
    }
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

        <form onSubmit={handleSubmit(submitHandler)}>
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
                <FormHelperText>
                  The email address will be used for verification
                </FormHelperText>
              )}
            </FormControl>

            {/* set password */}

            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="password">Set Password</FormLabel>
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

            {/*confirm password */}

            <FormControl isInvalid={errors.confirmPassword}>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                type="password"
                {...register("confirmPassword", {
                  required: "password must not be empty",
                  minLength: "minimum password length must be eight",
                })}
              />
              {errors.password && (
                <FormErrorMessage>
                  {errors.confirmPassword.message}
                </FormErrorMessage>
              )}
            </FormControl>

            {/* Signup button */}
            <Button colorScheme="pink" width={"full"} type="submit" my={2}>
              Signup
            </Button>
            <Text textAlign={"center"}>Or</Text>

            {/* Google Signup button */}
            <Button colorScheme="blue" width={"full"} mb={4}>
              Signup using Google
            </Button>

            {/* Link to Login */}

            <Text textAlign={"center"} fontSize={"large"}>
              Already a User?{" "}
              <Link
                as={RouteLink}
                to={"/login"}
                color={"teal.400"}
                fontWeight={"semibold"}
              >
                Login
              </Link>
            </Text>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
}

export default Signup;
