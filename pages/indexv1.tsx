/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useState } from "react";
import FacebookLogin from "react-facebook-login";
import "../styles/Home.module.css";
import { useUserContext } from "../context/user";
import api from "../services/api";
import { Data } from "../types/data";
import { Account } from "../types/accounts";

const Home: NextPage = () => {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({} as Data);
  const [picture, setPicture] = useState("");
  const { user, setUser } = useUserContext();
  const [accounts, setAccounts] = useState<Account[]>([]);

  const responseFacebook = (response: any) => {
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
      setUser({
        id: response.id,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url,
        accessToken: response.accessToken,
      });
    } else {
      setLogin(false);
    }
  };

  const handleInfo = async () => {
    if (!user || undefined) {
      return;
    }
    try {
      const response = await api.get(
        `me?fields=id%2Cname%2Caccounts&access_token=${user?.accessToken}`
      );
      setAccounts(response.data.accounts.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleInstagramAccount() = async () => {
  //   if (!user || undefined) {
  //     return;
  //   }
  //   try {
  //     const response = await api.get(
  //       `me?fields=id%2Cname%2Cinstagram_business_account&access_token=${user?.accessToken}`
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div>
      <h1>Home</h1>
      <div style={{ width: "300px" }}>
        {!login && (
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
        )}
        {login && (
          <div style={{ display: "flex" }}>
            <img
              src={picture}
              alt="profile"
              style={{ height: "40px", width: "40px", borderRadius: "20px" }}
            />
          </div>
        )}
      </div>
      {login && user && (
        <div>
          <h2>{user.name}</h2>
          <h3>{user.email}</h3>
        </div>
      )}

      <div>
        <button onClick={handleInfo}>List my Accounts</button>
      </div>
      <div>
        {accounts.map((account) => (
          <div key={account.id}>
            <h3>Nome: {account.name}</h3>
            <p>id: {account.id}</p>
            <p>Categoria: {account.category}</p>
            <div>
              <span>Tasks:</span>
              {account.tasks.map((task, index) => (
                <div key={index}>
                  <p>{task}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* <button onClick={handleInstagramAccount}>Listar Instagram</button> */}
      </div>
    </div>
  );
};

export default Home;
