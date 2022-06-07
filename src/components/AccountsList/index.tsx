import React, { useEffect, useState } from "react";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import theme from "../../styles/theme/lightThemeOptions";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import fireBaseApi from "../../services/fireBaseApi";
import { auth } from "../../utility/firebase.config";
import { Account } from "../AddAccountForm";
import { useAccountsContext } from "../../context/accounts";

const AccountsList = () => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { accounts, setAccounts, loadUserAccounts } = useAccountsContext();

  const handleRemoveAccountFromDB = async (account: Account) => {
    try {
      setIsLoading(true);
      const data = {
        userId: user?.uid,
        account: account,
      };
      await fireBaseApi.post("/delete-account", data);
      setAccounts(
        accounts!.filter((acc) => acc.facebookId !== account.facebookId)
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      toast.error("Erro ao remove conta.");
    }
  };

  useEffect(() => {
    loadUserAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          paddingBottom: "0.5rem",
          color: theme.palette.text.primary,
        }}
      >
        Contas Gerenciadas
      </Typography>
      <Stack
        spacing={2}
        direction="row"
        overflow="auto"
        sx={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: theme.palette.primary.main,
          borderRadius: "10px",
          padding: "1rem",
        }}
      >
        {accounts?.map((account) => (
          <Box
            sx={{
              borderRadius: "12px",
              backgroundColor: theme.palette.background.paper,
              padding: "1rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            key={account.facebookId}
          >
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
                paddingRight: "1rem",
              }}
            >
              <strong>{account.nickname}</strong>
            </Typography>
            <IconButton
              size="small"
              aria-label="add-account"
              onClick={() => handleRemoveAccountFromDB(account)}
            >
              <HighlightOffTwoToneIcon
                sx={{ color: theme.palette.error.dark }}
              />
            </IconButton>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export { AccountsList };
