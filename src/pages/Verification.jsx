import { Flex, Text, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { account } from "../appwrite/appwrite-config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleSignin } from "../store/auth-slice";

function Verification() {
  const navigate = useNavigate();
  // const urlParams = new URLSearchParams(window.location.search);
  // const userId = urlParams.get("userId");
  // const secret = urlParams.get("secret");

  // account.updateVerification(userId, secret).then(
  //   (success) => {
  //     console.log("User Verified");
  //     navigate("/dashboard");
  //   },
  //   (error) => console.log(error)
  // );

  const googleSession = useSelector((state) => state.auth.googleSession);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (googleSession !== true) dispatch(googleSignin());
    else {
      toast({
        status: "success",
        title: "Logged in successfully",
      });
      navigate("/dashboard");
    }
  }, [googleSession, userId]);

  return (
    <Flex
      minH={"100vh"}
      minW={"100vw"}
      bgColor={"dark"}
      justifyContent={"center"}
      alignItems={"center"}
      p={5}
    >
      <Text textColor={"teal.500"} fontSize={"3xl"}>
        {" "}
        Verifying...
      </Text>
    </Flex>
  );
}

export default Verification;
