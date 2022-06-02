import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, styled, TextField, Tooltip } from "@mui/material"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddIcon from '@mui/icons-material/Add';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { lightGreen, lightBlue, red, deepOrange } from "@mui/material/colors";
import fireBaseApi from "../../../services/fireBaseApi";
import { useAuthContext } from "../../../context/auth";

export interface Account {
  id: string
  nickname: string
}

const AddAccountBox = styled(Box)(({ theme }) => ({
  padding: "1rem",
  backgroundColor: lightBlue[600],
  maxWidth: 700,
  height: 300,
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
}));

const AddAccountForm = () => {
  const { user } = useAuthContext();

  const [accountsAdded, setAccountsAdded] = useState<Account[]>([]);
  const [addAccountModalOpen, setAddAccountModalOpen] = useState<boolean>(false)
  const [accountId, setAccountId] = useState<string>('')
  const [accountNickname, setAccountNickname] = useState<string>('')

  function onClose(){
    setAddAccountModalOpen(false)
    setAccountId('')
    setAccountNickname('')
  }

  function addAccount() {
    if (accountId === '') {
      toast.error('Por favor, informe o ID da conta')
      return
    }
    if (accountNickname === '') {
      toast.error('Por favor, dê um apelido para sua conta')
      return
    }
    setAccountsAdded([...accountsAdded, {
      id: accountId,
      nickname: accountNickname,
    }])
    setAddAccountModalOpen(false)
    setAccountId('')
    setAccountNickname('')
  }

  async function handleConfirm() {
    const data = {
      userId: user?.id,
      accounts: accountsAdded,
    }
    await fireBaseApi.post('/accounts', data)
    toast.success('Contas adicionadas com sucesso')
    setAccountsAdded([])
  }

  function handleRemoveAccount(accountId: string) {
    setAccountsAdded(accountsAdded.filter(account => account.id !== accountId))
  }

  function handleCancel() {
    setAddAccountModalOpen(false)
    setAccountId('')
    setAccountNickname('')
  }

  return (
    <>
      <AddAccountBox>
        <Stack
          width="100%"
          maxHeight="80%"
          sx={{
            alignItems: "center"
          }}
          overflow="scroll"
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
                key={account.id}
              >
                <Tooltip title={account.id} >
                  <Avatar
                    sx={{ width: 96, height: 96, bgcolor: lightGreen[400] }}>
                    {account.nickname}

                  </Avatar>
                </Tooltip>
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: -10,
                  }}
                  aria-label="add-account"
                  onClick={() => handleRemoveAccount(account.id)}
                >
                  <HighlightOffTwoToneIcon sx={{ color: red[900] }} />
                </IconButton>
              </Box>
            )
          })}
          <IconButton size="small" aria-label="add-account" onClick={() => setAddAccountModalOpen(true)}>
            <AddIcon sx={{ color: '#ffff' }} />
          </IconButton>
        </Stack>

        <Box
          sx={{
            width: "100%",
            maxHeight: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: "auto"
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: lightGreen[700],
              ":hover": {
                backgroundColor: lightGreen[800],
              }
            }}
            onClick={handleConfirm}
            disabled={accountsAdded.length === 0}
          >
            Confirmar
          </Button>
        </Box>
      </AddAccountBox>

      <Dialog
        open={addAccountModalOpen}
        onClose={onClose}
      >
        <DialogTitle >
          Insira o Id da conta que deseja adicionar
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            id="outlined-required"
            label="Código de conta"
            variant="outlined"
            value={accountId}
            fullWidth
            onChange={(e) => setAccountId(e.target.value)}
            sx={{
              marginTop: "1rem"
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
              marginTop: "1rem"
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={addAccount} autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}


export { AddAccountForm }


