import { InputLabel, MenuItem, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { Account } from "../AddAccountForm";
import { ChangeEvent } from "react";
import { useSearchContext } from "../../../context/search";

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

type SelectAccountProps = {
  accessToken: string;
  userAccounts: Account[];
};

const SelectAccount = ({ userAccounts }: SelectAccountProps) => {
  const { search, setSearch } = useSearchContext();
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <InputLabel id="select-helper">
        <StyledInputBase
          labelId="select-helper"
          id="select"
          value={userAccounts[0].facebookId}
          onChange={(e: any) => console.log(e.target.value)}
          label="Selecionar Conta"
        />
        {userAccounts.map((account) => (
          <MenuItem key={account.facebookId} value={account.facebookId}>
            {account.nickname}
          </MenuItem>
        ))}
      </InputLabel>
    </Search>
  );
};

export { SelectAccount };
