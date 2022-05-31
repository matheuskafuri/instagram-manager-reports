import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utility/firebase.config";
import { GoBackButton } from "./components/GoBackButton";
import { Loader } from "./components/Loader";
import { PricingComponent } from "./components/PricingComponent";
import { SiteNavBar } from "./components/SiteNavBar";

const Pricing = () => {
  const [user, userLoading] = useAuthState(auth);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {!user && userLoading && <Loader />}
      {user && !userLoading && (
        <>
          <GoBackButton />
          <SiteNavBar />
          <PricingComponent userUid={user.uid} />
        </>
      )}
    </div>
  );
};

export default Pricing;
