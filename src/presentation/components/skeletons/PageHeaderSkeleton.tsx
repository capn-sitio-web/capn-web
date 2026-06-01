import { Box, Skeleton } from "@mui/material";
import { skeletonBaseSx, skeletonDarkSx } from "./skeletonStyles";

const PageHeaderSkeleton = () => {
  return (
    <Box
      sx={{
        minHeight: { xs: 260, md: 360 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        background:
          "linear-gradient(135deg, rgba(30, 64, 175, 0.12), rgba(22, 163, 74, 0.10))",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 900, textAlign: "center" }}>
        <Skeleton
          variant="text"
          width="55%"
          height={58}
          sx={{ ...skeletonDarkSx, mx: "auto", mb: 1 }}
        />

        <Skeleton
          variant="text"
          width="80%"
          height={32}
          sx={{ ...skeletonBaseSx, mx: "auto" }}
        />

        <Skeleton
          variant="text"
          width="65%"
          height={32}
          sx={{ ...skeletonBaseSx, mx: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default PageHeaderSkeleton;
