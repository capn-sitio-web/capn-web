import { Box, Container, Grid, Skeleton } from "@mui/material";
import PageHeaderSkeleton from "./PageHeaderSkeleton";
import SectionSkeleton from "./SectionSkeleton";
import {
  skeletonBaseSx,
  skeletonDarkSx,
  skeletonGreenSx,
} from "./skeletonStyles";

const ImageRightPageSkeleton = () => {
  return (
    <Box>
      <PageHeaderSkeleton />

      {/* Skeleton: sección principal con imagen a la derecha */}
      <Box sx={{ py: { xs: 6, md: 9 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Skeleton variant="text" width="55%" height={46} sx={skeletonDarkSx}/>
              <Skeleton variant="text"width="100%" height={28} sx={skeletonBaseSx}/>
              <Skeleton variant="text" width="95%" height={28} sx={skeletonBaseSx}/>
              <Skeleton variant="text" width="90%" height={28} sx={skeletonBaseSx}/>
              <Skeleton variant="text" width="75%" height={28} sx={skeletonBaseSx}/>
            </Grid>

            <Grid item xs={12} md={6}>
              <Skeleton
                variant="rounded"
                width="100%"
                height={320}
                sx={{
                  ...skeletonBaseSx,
                  borderRadius: 4,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Skeleton: sección de 2 tarjetas */}
      <SectionSkeleton cards={2} backgroundColor="#F9FAFB" />

      {/* Skeleton: sección de 4 tarjetas */}
      <SectionSkeleton cards={4} />

      {/* Skeleton: sección tipo equipo / cards con imagen */}
      <Box sx={{ py: { xs: 6, md: 9 }, backgroundColor: "#F9FAFB" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Skeleton
              variant="text"
              width="35%"
              height={44}
              sx={{
                ...skeletonDarkSx,
                mx: "auto",
                mb: 1,
              }}
            />

            <Skeleton
              variant="text"
              width="55%"
              height={28}
              sx={{
                ...skeletonBaseSx,
                mx: "auto",
              }}
            />
          </Box>

          <Grid container spacing={3}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "rgba(37, 99, 235, 0.16)",
                    backgroundColor: "background.paper",
                  }}
                >
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height={210}
                    sx={skeletonBaseSx}/>

                  <Box sx={{ p: 3 }}>
                    <Skeleton variant="text" width="70%" height={34} sx={skeletonDarkSx}/>
                    <Skeleton variant="text" width="45%" height={26}sx={skeletonGreenSx}/>
                    <Skeleton variant="text"width="100%" sx={skeletonBaseSx}/>
                    <Skeleton variant="text" width="90%" sx={skeletonBaseSx}/>
                    <Skeleton variant="text" width="75%" sx={skeletonBaseSx}/>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default ImageRightPageSkeleton;
