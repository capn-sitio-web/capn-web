import { Box, Container, Grid, Skeleton } from "@mui/material";

import PageHeaderSkeleton from "./PageHeaderSkeleton";
import SectionSkeleton from "./SectionSkeleton";

import {
  skeletonBaseSx,
  skeletonDarkSx,
  skeletonGreenSx,
} from "./skeletonStyles";

const CardPageSkeleton = () => {
  return (
    <Box>
      <PageHeaderSkeleton />

      <SectionSkeleton cards={4} backgroundColor="#F9FAFB" />

      <Box sx={{ py: { xs: 6, md: 9 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Skeleton variant="text" width="55%" height={46} sx={skeletonDarkSx}/>
              <Skeleton variant="text" width="100%" sx={skeletonBaseSx} />
              <Skeleton variant="text" width="90%" sx={skeletonBaseSx} />
              <Skeleton variant="text" width="75%" sx={skeletonBaseSx} />

              <Box sx={{ mt: 3 }}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="text"
                    width={`${80 - index * 8}%`}
                    height={30}
                    sx={index === 0 ? skeletonGreenSx : skeletonBaseSx}
                  />
                ))}
              </Box>

              <Skeleton
                variant="rounded"
                width={160}
                height={44}
                sx={{
                  ...skeletonGreenSx,
                  mt: 3,
                  borderRadius: 2,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Skeleton
                variant="rounded"
                width="100%"
                height={340}
                sx={{
                  ...skeletonBaseSx,
                  borderRadius: 4,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <SectionSkeleton cards={4} backgroundColor="#F9FAFB" />
    </Box>
  );
};

export default CardPageSkeleton;
