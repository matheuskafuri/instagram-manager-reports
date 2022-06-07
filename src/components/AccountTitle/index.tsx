import { Typography } from "@mui/material";
import React from "react";
import { useAccountsContext } from "../../context/accounts";
import { useSearchContext } from "../../context/search";
import theme from "../../styles/theme/lightThemeOptions";

const AccountTitle = () => {
  const { search } = useSearchContext();
  const { accounts } = useAccountsContext();

  const searchedAccount = accounts.find(
    (account) => account.facebookId === search
  );
  const displayName = searchedAccount?.nickname || null;
  return (
    <Typography
      variant="h4"
      sx={{ textAlign: "center", color: theme.palette.primary.main, mb: 4 }}
      fontWeight="bold"
    >
      <span style={{ color: theme.palette.text.primary }}>Report:</span>{" "}
      {displayName}
    </Typography>
  );
};

export { AccountTitle };
