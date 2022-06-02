import React from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.config";
import { Loader } from "../pages/components/Loader";

export const withPublic = (WrappedComponent: any) => {
  const WithPublic = (props: any) => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    if (user) {
      router.replace("/");
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithPublic;
};
