import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import fireBaseApi from "../../../services/fireBaseApi";
import { useAuthContext } from "../../../context/auth";
import theme from "../../../styles/theme/lightThemeOptions";
import { Loader } from "../Loader";

export interface Account {
  facebookId: string;
  nickname: string;
}

const AddAccountBox = styled(Box)(({ theme }) => ({
  padding: "1rem",
  backgroundColor: theme.palette.primary.main,
  maxWidth: 750,
  height: 350,
  borderRadius: 10,
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  margin: "auto",
}));

const AddAccountForm = () => {
  const { user } = useAuthContext();

  const [accountsAdded, setAccountsAdded] = useState<Account[]>([]);
  const [addAccountModalOpen, setAddAccountModalOpen] =
    useState<boolean>(false);
  const [facebookId, setFacebookId] = useState<string>("");
  const [accountNickname, setAccountNickname] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onClose() {
    setAddAccountModalOpen(false);
    setFacebookId("");
    setAccountNickname("");
  }

  function addAccount() {
    if (facebookId === "") {
      toast.warning("Por favor, informe o ID da conta");
      return;
    }
    if (accountNickname === "") {
      toast.warning("Por favor, dê um apelido para sua conta");
      return;
    }
    if (accountNickname.length > 10) {
      toast.warning("Apelido de no máximo 10 caracteres");
      return;
    }
    setAccountsAdded([
      ...accountsAdded,
      {
        facebookId: facebookId,
        nickname: accountNickname,
      },
    ]);
    setAddAccountModalOpen(false);
    setFacebookId("");
    setAccountNickname("");
  }

  async function handleConfirm() {
    try {
      setIsLoading(true);
      const data = {
        userId: user?.id,
        accounts: accountsAdded,
      };
      await fireBaseApi.post("/accounts", data);
      toast.success("Contas sincronizadas com sucesso");
      setAccountsAdded([]);
      setIsLoading(false);
    } catch (err) {
      toast.error("Erro ao adicionar contas");
      setIsLoading(false);
    }
  }

  function handleRemoveAccount(facebookId: string) {
    setAccountsAdded(
      accountsAdded.filter((account) => account.facebookId !== facebookId)
    );
  }

  function handleCancel() {
    setAddAccountModalOpen(false);
    setFacebookId("");
    setAccountNickname("");
  }

  return (
    <>
      <AddAccountBox>
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: "center", mb: "2rem", color: "#fff" }}
        >
          Adicione as contas que você deseja monitorar
        </Typography>
        <Stack
          width="100%"
          maxHeight="80%"
          sx={{
            alignItems: "center",
          }}
          overflow="auto"
          direction="row"
          spacing={1}
          p={2}
        >
          {accountsAdded.map((account) => {
            return (
              <Box
                sx={{
                  position: "relative",
                }}
                key={account.facebookId}
              >
                <Tooltip title={account.facebookId}>
                  <Avatar
                    sx={{
                      width: 96,
                      height: 96,
                      bgcolor: theme.palette.secondary.light,
                    }}
                  >
                    {account.nickname}
                  </Avatar>
                </Tooltip>
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: -20,
                  }}
                  aria-label="add-account"
                  onClick={() => handleRemoveAccount(account.facebookId)}
                >
                  <HighlightOffTwoToneIcon
                    sx={{ color: theme.palette.error.dark }}
                  />
                </IconButton>
              </Box>
            );
          })}
          <IconButton
            size="small"
            aria-label="add-account"
            onClick={() => setAddAccountModalOpen(true)}
          >
            <AddIcon sx={{ color: "#ffff" }} />
          </IconButton>
        </Stack>

        <Box
          sx={{
            width: "100%",
            maxHeight: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: "auto",
          }}
        >
          {isLoading ? (
            <CircularProgress sx={{ color: theme.palette.secondary.main }} />
          ) : (
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                ":hover": {
                  backgroundColor: theme.palette.secondary.light,
                },
              }}
              onClick={handleConfirm}
              disabled={accountsAdded.length === 0}
            >
              Sincronizar contas
            </Button>
          )}
        </Box>
      </AddAccountBox>

      <Dialog open={addAccountModalOpen} onClose={onClose}>
        <DialogContent>
          <DialogTitle>Insira as informações da conta</DialogTitle>
          <TextField
            required
            id="outlined-required"
            label="ID da conta"
            variant="outlined"
            value={facebookId}
            fullWidth
            onChange={(e) => setFacebookId(e.target.value)}
            sx={{
              marginTop: "1rem",
              ":hover": {
                borderColor: theme.palette.primary.main,
              },
            }}
            InputLabelProps={{
              style: { color: theme.palette.primary.main },
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Apelido"
            variant="outlined"
            value={accountNickname}
            error={accountNickname.length > 10}
            fullWidth
            onChange={(e) => setAccountNickname(e.target.value)}
            sx={{
              marginTop: "1rem",
              ":hover": {
                borderColor: theme.palette.primary.main,
              },
            }}
            InputLabelProps={{
              style: { color: theme.palette.primary.main },
            }}
          />
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={addAccount} autoFocus>
              Add
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { AddAccountForm };
