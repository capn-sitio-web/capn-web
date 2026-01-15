import { useState } from "react";
import { Box } from "@mui/material";

import DashboardHeader from "../components/DashboardHeader";

export default function DashboardPage() {
  const [range, setRange] = useState<"7d" | "30d" | "90d">("7d");

  return (
    <Box>
      <DashboardHeader range={range} onChangeRange={setRange} />
    </Box>
  );
}
