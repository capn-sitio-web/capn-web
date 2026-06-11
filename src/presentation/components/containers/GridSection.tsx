import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";

interface GridSectionProps<T extends object> {
  title: string;
  subtitle?: string;
  items: T[];
  CardComponent: React.ComponentType<T>;
  columns?: 2 | 3 | 4;
  backgroundColor?: string;
  variant?: "default" | "process";
}

const GridSection = <T extends object>({
  title,
  subtitle,
  items,
  CardComponent,
  columns = 4,
  backgroundColor = "transparent",
  variant = "default",
}: GridSectionProps<T>) => {
  return (
    <Box bgcolor={backgroundColor} pt={6} pb={9}>
      <Container>
        <Box mb={3}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ opacity: 0.8 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        <Grid
          container
          spacing={6}
          justifyContent="center"
        >
          {items.map((item, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={columns === 4 ? 4 : 6}
              lg={12 / columns}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: variant === "process" ? 260 : "none",
                  height: "100%",

                  ...(variant === "process" && {
                    textAlign: "center",

                    "& .MuiTypography-h6": {
                      minHeight: 58,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      lineHeight: 1.35,
                      mb: 1.2,
                    },

                    "& .MuiTypography-body2": {
                      maxWidth: 240,
                      mx: "auto",
                      //textAlign: "justify",
                      textAlignLast: "center",
                      lineHeight: 1.6,
                    },
                  }),
                }}
              >
                <CardComponent {...item} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default GridSection;