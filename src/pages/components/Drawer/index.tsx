import React, { useState } from "react";
import { Header } from "../Header";
import { useRouter } from "next/router";
import { Insights } from "../../../types/insights";
import { useInsightsContext } from "../../../context/insights";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import StarIcon from "@mui/icons-material/Star";
import { IconButton, Toolbar } from "@mui/material";
import { deepOrange, lightBlue } from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';
import theme from "../../../styles/theme/lightThemeOptions";

type TemporaryDrawerProps = {
  handleInsightSelection: (insight: Insights | undefined) => void;
};

const TemporaryDrawer = ({ handleInsightSelection }: TemporaryDrawerProps) => {
  const [state, setState] = useState(false);
  const { insights } = useInsightsContext();
  const router = useRouter();

  const handleSelect = (text: string) => {
    if (text === "Todos Insights") {
      handleInsightSelection(undefined);
    }
    const insight = insights?.find((item: any) => item.title === text);
    handleInsightSelection(insight);
    setState(false);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState(open);
    };
  return (
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        aria-label="open drawer"
        sx={{ mr: 2, color: theme.palette.primary.main }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={state} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(true)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
              <ListItemButton
                onClick={() => {
                  router.push("/add-accounts");
                }}
              >
                <ListItemIcon>
                  <AddIcon sx={{ color: lightBlue[800] }} />
                </ListItemIcon>
                <ListItemText primary="Adicionar conta" />
              </ListItemButton>
            {[
              
              "Todos Insights",
              "Alcance",
              "Impressões",
              "Visualizações do perfil",
              "Contactos de e-mail",
            ].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleSelect(text)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <InboxIcon sx={{ color: theme.palette.secondary.main }} />
                    ) : (
                      <MailIcon sx={{ color: theme.palette.primary.light }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {[
              "Cliques em Obter Indicações",
              "Cliques para chamada",
              "Cliques para mensagem",
              "Cliques para o site",
            ].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleSelect(text)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <InboxIcon sx={{ color: theme.palette.primary.light }} />
                    ) : (
                      <MailIcon sx={{ color: theme.palette.secondary.main }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding sx={{ backgroundColor: "#e1f5fe" }}>
              <ListItemButton
                onClick={() => {
                  router.push("/followers-count");
                }}
              >
                <ListItemIcon>
                  <StarIcon sx={{ color: theme.palette.primary.light }} />
                </ListItemIcon>
                <ListItemText primary="Análise de Seguidores" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Header>Dashboard</Header>
    </Toolbar>
  );
};

export { TemporaryDrawer };
