import React, { useState, KeyboardEvent, MouseEvent } from "react";
import { Header } from "../Header";
import { useRouter } from "next/router";
import { Insights } from "../../types/insights";
import { useInsightsContext } from "../../context/insights";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import StarIcon from "@mui/icons-material/Star";
import InsightsIcon from "@mui/icons-material/Insights";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton, Toolbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import theme from "../../styles/theme/lightThemeOptions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utility/firebase.config";
import usePremiumStatus from "../../../stripe/usePremiumStatus";
import { UpgradeButton } from "../UpgradeButton";

type TemporaryDrawerProps = {
  handleInsightSelection: (insight: Insights | undefined) => void;
};

const TemporaryDrawer = ({ handleInsightSelection }: TemporaryDrawerProps) => {
  const [state, setState] = useState(false);
  const { insights } = useInsightsContext();
  const [firebaseUser] = useAuthState(auth);
  const isUserPremium = usePremiumStatus(firebaseUser!);
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
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
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
            <Divider component="li" />
            <li>
              <Typography
                sx={{ mt: 0.5, ml: 2 }}
                color="text.primary"
                display="block"
                variant="caption"
              >
                P??ginas
              </Typography>
            </li>
            <ListItemButton
              onClick={() => {
                router.push("/");
              }}
            >
              <ListItemIcon>
                <HomeIcon sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                router.push("/add-accounts");
              }}
            >
              <ListItemIcon>
                <AddIcon sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText primary="Adicionar conta" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                router.push("/followers-count");
              }}
              sx={{
                backgroundColor: "#e1f5fe",
              }}
            >
              <ListItemIcon>
                <StarIcon sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText primary="An??lise de Seguidores" />
            </ListItemButton>
          </List>
          <List dense={true}>
            <Divider component="li" variant="inset" />
            <li>
              <Typography
                sx={{ mt: 0.5, ml: 9 }}
                color="text.primary"
                display="block"
                variant="caption"
              >
                Insights
              </Typography>
            </li>
            {[
              "Todos Insights",
              "Alcance",
              "Impress??es",
              "Visualiza????es do perfil",
              "Contactos de e-mail",
              "Cliques em Obter Indica????es",
              "Cliques para chamada",
              "Cliques para mensagem",
              "Cliques para o site",
            ].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleSelect(text)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <InsightsIcon
                        sx={{ color: theme.palette.secondary.main }}
                      />
                    ) : (
                      <InsightsIcon
                        sx={{ color: theme.palette.primary.main }}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {!isUserPremium && <UpgradeButton />}
        </Box>
      </Drawer>
      <Header>Dashboard</Header>
    </Toolbar>
  );
};

export { TemporaryDrawer };
