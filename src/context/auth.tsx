import React, { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/user";
import { auth, db } from "../utility/firebase.config";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { destroyCookie, setCookie } from "nookies";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

type AuthContextData = {
  user: User | null;
  signInWithFacebook: () => void;
  signOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

const handleCookies = (accessToken: any, username: string) => {
  setCookie(null, "accessToken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
  setCookie(null, "username", username, {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    path: "/",
  } as any);
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser] = useAuthState(auth);
  const router = useRouter();

  const signOut = async () => {
    auth.signOut().then(() => {
      destroyCookie(null, "accessToken");
      destroyCookie(null, "username");
    });
    setUser(null);
    router.push("/");
  };

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    provider.addScope(
      "public_profile,user_friends,user_posts,email,read_insights,pages_show_list,business_management,instagram_basic,instagram_manage_insights,pages_read_engagement"
    );

    signInWithPopup(auth, provider)
      .then(async (result) => {
        // Create a document inside the users collection with the name of the uid of the user
        try {
          await setDoc(doc(db, "users", result.user.uid), {
            uid: result.user.uid,
            email: result.user.email,
            name: result.user.displayName,
            provider: result.user.providerData[0].providerId,
            photoUrl: result.user.photoURL,
          });
        } catch (error) {
          console.log(error);
        }
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;

        const user: any = {
          id: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          picture: result.user.photoURL,
          accessToken,
        };

        setUser(user);
        handleCookies(accessToken, user.name);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  };

  useEffect(() => {
    if (firebaseUser) {
      setUser({
        id: firebaseUser.uid,
        name: firebaseUser.displayName!,
        email: firebaseUser.email!,
        picture: firebaseUser.photoURL!,
      });
    }
  }, [firebaseUser]);

  return (
    <AuthContext.Provider value={{ user, signInWithFacebook, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return context;
};

export { AuthProvider, useAuthContext };
