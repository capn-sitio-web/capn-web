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
          backgroundColor: "rgba(0,0,0,0.45)",
        },
      }}
    >
      <Container sx={{ position: "relative" }}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight="bold" color="#bebce5ff" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {subtitle}
          </Typography>
					<Stack
						direction={{ xs: "column", sm: "row" }}
						spacing={2}
						justifyContent={{ xs: "center"}}
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