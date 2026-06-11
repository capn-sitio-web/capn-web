import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  image: string;
  buttons?: { label: string; color?: "primary" | "secondary" | "success"; onClick?: () => void }[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, image, buttons = [] }) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "70vh", md: "80vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(15, 23, 42, 0.78) 0%, rgba(11, 126, 167, 0.48) 55%, rgba(15, 23, 42, 0.55) 100%)",
        },
      }}
    >
      <Container sx={{ position: "relative", textAlign: "center" }}>
        <Grid item xs={12} md={7}>
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{
              color: "common.white",
              fontSize: { xs: "2.2rem", md: "3.4rem" },
              lineHeight: 1.1,
              maxWidth: 900,
              mx: "auto",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: "rgba(255,255,255,0.92)",
              fontWeight: 600,
              maxWidth: 820,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent={{ xs: "center" }}
          >
            {buttons.map((btn) => (
              <Button
                key={btn.label}
                variant="outlined"
                /*color={btn.color || "primary"}*/
                onClick={btn.onClick}
                sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  "&:hover": {
                    borderColor: "#fff",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                {btn.label}
              </Button>
            ))}
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;