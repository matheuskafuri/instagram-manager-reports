import { useRouter } from "next/router";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const GoBackButton = (props: any) => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="open drawer"
      onClick={handleClick}
      {...props}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};

export { GoBackButton };
