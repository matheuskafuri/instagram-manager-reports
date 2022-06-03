import React, { FormEvent, useState, MouseEvent, ChangeEvent } from "react";
import { useInsightsContext } from "../../../context/insights";
import { useAuthContext } from "../../../context/auth";
import { useSearchContext } from "../../../context/search";

import api from "../../../services/api";

import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  Box,
  Menu,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { GoBackButton } from "../GoBackButton";
import { Account } from "../AddAccountForm";
import { toast } from "react-toastify";

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

const StyledInputBase = styled(Select)(({ theme }) => ({
  color: "inherit",
  padding: theme.spacing(1, 1, 1, 0),
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

const dateFormatter = (date: string) => {
  return Intl.DateTimeFormat("pt-BR").format(new Date(date));
};

type PrimarySearchAppBarProps = {
  accessToken: string;
  userAccounts: Account[];
};

const PrimarySearchAppBar = ({
  accessToken,
  userAccounts,
}: PrimarySearchAppBarProps) => {
  const { user } = useAuthContext();
  const { setInsights } = useInsightsContext();
  const { search, setSearch } = useSearchContext();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearch(event.target.value);
  };

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
      toast.error("Por favor, informe uma conta no campo de busca.");
      return;
    }

    const finalDateAsUnixTimestamp = finalDate
      ? finalDate.getTime() / 1000
      : new Date().getTime() / 1000;
    const initialDateUnixTimestamp = initialDate
      ? initialDate.getTime() / 1000
      : finalDateAsUnixTimestamp - 86400 * 30;

    if (finalDateAsUnixTimestamp - initialDateUnixTimestamp > 30 * 86400) {
      toast.error("O período máximo de busca é de 30 dias");
      return;
    }

    const since = initialDateUnixTimestamp.toFixed(0);
    const until = finalDateAsUnixTimestamp.toFixed(0);

    try {
      const response = await api.get(
        `${search}/insights?metric=reach%2Cimpressions%2Cprofile_views%2Cemail_contacts%2Cget_directions_clicks%2Cphone_call_clicks%2Ctext_message_clicks%2Cwebsite_clicks&period=day&since=${since}&until=${until}&access_token=${accessToken}`
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
      setInsights(insights);
    } catch (error: any) {
      console.log(error);
      toast.error(
        "Ocorreu um erro ao buscar os insights. Por favor, verifique o código da conta."
      );
    }
  };

  // mobile menu logic
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
          <GoBackButton />

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
                labelId="select-helper"
                id="select"
                value={search}
                onChange={(e: any) => handleChange(e)}
                label="Selecione uma conta"
              >
                {userAccounts.map((account) => (
                  <MenuItem key={account.facebookId} value={account.facebookId}>
                    {account.nickname}
                  </MenuItem>
                ))}
              </StyledInputBase>
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
