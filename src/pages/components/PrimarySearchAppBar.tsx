import React, { FormEvent, useState, MouseEvent } from "react";
import { useUserContext } from "../../context/user";
import api from "../../services/api";

import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
  Avatar,
  Box,
  Badge,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const DateSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

type PrimarySearchAppBarProps = {
  handleSetData: (data: any) => void;
};

const dateFormatter = (date: string) => {
  return Intl.DateTimeFormat("pt-BR").format(new Date(date));
};

const PrimarySearchAppBar = ({ handleSetData }: PrimarySearchAppBarProps) => {
  const { user } = useUserContext();
  const [search, setSearch] = useState("");
  const [initialDate, setInitialDate] = useState<Date | null>(new Date());
  const [finalDate, setFinalDate] = useState<Date | null>(new Date());

  const handleInitialDate = (newValue: Date | null) => {
    if (null) {
      setInitialDate(new Date());
    }
    setInitialDate(newValue);
  };

  const handleFinalDate = (newValue: Date | null) => {
    if (null) {
      setFinalDate(new Date());
    }
    setFinalDate(newValue);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) {
      alert("Por favor, preencha o campo de busca");
      return;
    }

    const finalDateAsUnixTimestamp = finalDate
      ? finalDate.getTime() / 1000
      : new Date().getTime() / 1000;
    const initialDateUnixTimestamp = initialDate
      ? initialDate.getTime() / 1000
      : finalDateAsUnixTimestamp - 86400 * 30;

    if (finalDateAsUnixTimestamp - initialDateUnixTimestamp > 30 * 86400) {
      alert("Período máximo de 30 dias");
      return;
    }

    const since = initialDateUnixTimestamp.toFixed(0);
    const until = finalDateAsUnixTimestamp.toFixed(0);

    try {
      const response = await api.get(
        `${search}/insights?metric=reach%2Cimpressions%2Cprofile_views%2Cemail_contacts%2Cfollower_count%2Cget_directions_clicks%2Cphone_call_clicks%2Ctext_message_clicks%2Cwebsite_clicks&period=day&since=${since}&until=${until}&access_token=${user?.accessToken}`
      );
      const data = response.data.data;
      const insights = data.map((item: any) => {
        const values = item.values.map((value: any) => {
          return {
            end_time: dateFormatter(value.end_time),
            value: value.value,
          };
        });
        return {
          name: item.name,
          period: item.period,
          values,
          title: item.title,
          description: item.description,
        };
      });
      handleSetData(insights);
    } catch (error) {
      console.log(error);
    }
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>{user?.name}</MenuItem>
      <MenuItem onClick={handleMenuClose}>{user?.email}</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Manager Reports
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Procurar…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Search>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateSearch>
                <DesktopDatePicker
                  inputFormat="dd/MM/yyyy"
                  minDate={new Date("2020-01-01")}
                  value={initialDate}
                  onChange={handleInitialDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </DateSearch>
              <DateSearch>
                <DesktopDatePicker
                  inputFormat="dd/MM/yyyy"
                  minDate={new Date("2020-01-01")}
                  value={finalDate}
                  onChange={handleFinalDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </DateSearch>
            </LocalizationProvider>
            <Button
              color="inherit"
              size="small"
              variant="outlined"
              type="submit"
            >
              Buscar
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar alt={user?.name} src={user?.picture} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export { PrimarySearchAppBar };
