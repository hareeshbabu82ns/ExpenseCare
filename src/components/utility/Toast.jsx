import React from "react";

function Toast({ Component, ...toastProperties }) {
  const toast = useToast();
  // const {title, description, status, duration, isClosable} = toastProperties
  return (
    <Component
      onClick={() =>
        toast({
          title: toastProperties.title || "Success Toast",
          description: toastProperties.description || "This is a success Toast",
          status: toastProperties.status || "success",
          duration: toastProperties.duration || 9000,
          isClosable: toastProperties.isClosable || true,
        })
      }
    />
  );
}

export default Toast;
