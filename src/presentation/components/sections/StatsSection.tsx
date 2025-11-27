import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, Fade } from "@mui/material";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
  backgroundImage: string;
  duration?: number; // tiempo de la animación (en ms)
}

const StatsSection: React.FC<StatsSectionProps> = ({
  stats,
  backgroundImage,
  duration = 1500,
}) => {
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(() => Array(stats.length).fill(0));

  useEffect(() => {
    const section = document.getElementById("stats-section");
    const handleScroll = () => {
      if (!section) return;
      if (section.getBoundingClientRect().top < window.innerHeight * 0.8) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animación del contador
  useEffect(() => {
    if (!visible) return;
    const intervals = stats.map((stat, index) => {
      let current = 0;
      const stepTime = duration / stat.value;

      const interval = setInterval(() => {
        current += 1;
        setCounts(prev =>
          prev.map((val, i) => (i === index ? Math.min(current, stat.value) : val))
        );

        if (current >= stat.value) {
          clearInterval(interval);
        }
      }, stepTime);

      return interval;
    });
    return () => intervals.forEach(clearInterval);
  }, [visible, stats, duration]);

  return (
    <Box
      id="stats-section"
      sx={{ /* Image */
        position: "relative",
        color: "white",
        py: 10,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(10, 83, 228, 0.85)",
          opacity: 0.85,
        }}
      />

      {/* Content */}
      <Container sx={{ position: "relative" }}>
        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Fade in={visible} timeout={1000 + index * 300}>
                <Box>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    display="flex"
                    justifyContent="center"
                    alignItems="baseline"
                    sx={{
                      gap: 0.5,
                    }}
                  >
                    {counts[index]}
                    {stat.suffix && (
                      <Typography
                        component="span"
                        variant="h4"
                        fontWeight="bold"
                        //sx={{ lineHeight: 1 }}
                      >
                        {stat.suffix}
                      </Typography>
                    )}
                  </Typography>
                  <Typography variant="subtitle1">{stat.label}</Typography>
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsSection;
