import React, { useEffect } from "react";
import { useUserContext } from "../context/user";
import { useRouter } from "next/router";
import api from "../services/api";

const Dashboard = () => {
  const { user } = useUserContext();
  console.log(user);
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>User</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Dashboard;
