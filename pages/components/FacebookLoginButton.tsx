import React from "react";
import FacebookLogin from "react-facebook-login";
import { useUserContext } from "../../context/user";

type FacebookLoginButtonProps = {
  handleLoginState: (status: boolean) => void;
};

const FacebookLoginButton = ({
  handleLoginState,
}: FacebookLoginButtonProps) => {
  const { setUser } = useUserContext();

  const responseFacebook = (response: any) => {
    console.log(response);
    if (response.accessToken) {
      handleLoginState(true);
      setUser({
        id: response.id,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url,
        accessToken: response.accessToken,
      });
    } else {
      handleLoginState(false);
    }
  };

  return (
    <FacebookLogin
      appId="5338366886214093"
      autoLoad={true}
      fields="name,email,picture"
      scope="public_profile,user_friends,user_posts,email,read_insights,pages_show_list,business_management,instagram_basic,instagram_manage_insights,pages_read_engagement"
      callback={responseFacebook}
      icon="fa-facebook"
      buttonStyle={{ width: "100%", borderRadius: "5px" }}
      size="small"
      cookie={true}
      xfbml={true}
    />
  );
};

export default FacebookLoginButton;
