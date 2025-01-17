import {
  Button,
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
import { loginUser } from "../store/auth-slice";
import { loadingActions } from "../store/loading-slice";
import Loading from "../components/utility/Loading";

function Login() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm( {
    defaultValues: {
      email: "",
      password: "",
    },
  } );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector( ( state ) => state.loading.isLoading );
  const toast = useToast();

  async function loginHandler( { email, password } ) {
    dispatch( loginUser( { email, password } ) ).then( ( { error } ) => {
      if ( error ) {
        console.log( error );
        reset();
        toast( {
          title: "Not able to Login",
          description: "Please provide correct email ID and password",
          status: "error",
          colorScheme: "red",
        } );
      } else {
        navigate( "/dashboard" );
        toast( {
          title: "Logged in Successfully",
          status: "success",
          colorScheme: "teal",
        } );
      }
    } )
  }

  function loginUsingGoogle() {
    dispatch( loadingActions.setLoading( true ) );
    account.createOAuth2Session(
      "google",
      "http://localhost:3000/verification",
      "http://localhost:3000/login"
    );

    dispatch( loadingActions.setLoading( false ) );
  }

  if ( isLoading ) {
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

        <form onSubmit={handleSubmit( loginHandler )}>
          {/* email */}
          <Flex
            flexDir={"column"}
            gap={4}
            bgColor={"lightgray"}
            color={"whiteAlpha.900"}
            p={10}
            rounded={"xl"}
          >
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                placeholder="Registered Email ID"
                w={"xs"}
                type="email"
                {...register( "email", { required: "email is required" } )}
              />

              {errors.email ? (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              ) : (
                <FormHelperText textColor={"whiteAlpha.800"}></FormHelperText>
              )}
            </FormControl>

            {/* set password */}

            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                {...register( "password", {
                  required: "password must not be empty",
                  minLength: "minimum password length must be eight",
                } )}
              />
              {errors.password ? (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              ) : (
                <FormHelperText textColor={"whiteAlpha.700"}></FormHelperText>
              )}
            </FormControl>

            {/* Login button */}
            <Button colorScheme="pink" width={"full"} type="submit" my={2}>
              Login
            </Button>
            <Text textAlign={"center"} fontSize={"large"}>
              Forgot Passwword?{" "}
              <Link
                as={RouteLink}
                to={"/forgot-password"}
                color={"teal.400"}
                fontWeight={"semibold"}
              >
                Reset
              </Link>
            </Text>
            <Text textAlign={"center"}>Or</Text>

            {/* Google Login button */}
            <Button
              colorScheme="blue"
              width={"full"}
              mb={4}
              onClick={loginUsingGoogle}
            >
              Signin using Google
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
