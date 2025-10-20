import React from "react";
import { green } from '@mui/material/colors';
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";

interface ServiceCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <Card
    elevation={2}
    sx={{
      borderRadius: 3,
      textAlign: "center",
      p: 2,
      height: "100%",
      transition: "transform 0.2s ease",
      "&:hover": { transform: "translateY(-6px)" },
    }}
  >
    <CardContent>
      {icon && <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Avatar sx={{ color: green[600], bgcolor: green[100], width: 56, height: 56 }}>
          {icon}
        </Avatar>
      </Box>}
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default ServiceCard;