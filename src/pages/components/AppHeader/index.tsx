import { Box } from "@mui/material";
import { Insights } from "../../../types/insights";
import { TemporaryDrawer } from "../Drawer";
import { PrimarySearchAppBar } from "../PrimarySearchAppBar";

interface AppHeaderProps {
  handleInsightSelection?: (insight: Insights | undefined) => void;
  accessToken: string;
}

export function AppHeader({
  handleInsightSelection = () => {},
  accessToken,
}: AppHeaderProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <TemporaryDrawer handleInsightSelection={handleInsightSelection} />
      <PrimarySearchAppBar accessToken={accessToken} />
    </Box>
  );
}
