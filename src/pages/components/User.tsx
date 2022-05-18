import { Avatar, Stack } from "@mui/material";
import React from "react";
import { useUserContext } from "../../context/user";

const User = () => {
  const { user } = useUserContext();
  return (
    <Stack direction="row" spacing={2}>
      <Avatar src={user?.picture} alt={user?.name} />
    </Stack>
  );
};

export { User };
