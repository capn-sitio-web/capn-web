import { Box, Container, Grid, Skeleton } from "@mui/material";
import { skeletonBaseSx, skeletonDarkSx, skeletonGreenSx } from "./skeletonStyles";

type SectionSkeletonProps = {
  cards?: number;
  backgroundColor?: string;
};

const SectionSkeleton = ({
  cards = 4,
  backgroundColor = "white",
}: SectionSkeletonProps) => {
  return (
    <Box sx={{ py: { xs: 6, md: 9 }, backgroundColor }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Skeleton
            variant="text"
            width="35%"
            height={44}
            sx={{ ...skeletonDarkSx, mx: "auto", mb: 1 }}
          />

          <Skeleton
            variant="text"
            width="55%"
            height={28}
            sx={{ ...skeletonBaseSx, mx: "auto" }}
          />
        </Box>

        <Grid container spacing={3}>
          {Array.from({ length: cards }).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "rgba(37, 99, 235, 0.16)",
                  backgroundColor: "background.paper",
                  minHeight: 180,
                }}
              >
                <Skeleton variant="circular" width={48} height={48} sx={skeletonGreenSx}/>
                <Skeleton variant="text" width="70%" height={32} sx={{ ...skeletonDarkSx, mt: 2 }}/>
                <Skeleton variant="text" width="100%" sx={skeletonBaseSx} />
                <Skeleton variant="text" width="85%" sx={skeletonBaseSx} />
                <Skeleton variant="text" width="60%" sx={skeletonBaseSx} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SectionSkeleton;
