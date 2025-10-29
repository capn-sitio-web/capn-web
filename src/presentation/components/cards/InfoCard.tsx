import { Box, Typography } from "@mui/material";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description }) => {
  return (
    <Box textAlign="center" px={2}>
      <Box
        sx={{
          width: 64,
          height: 64,
          mx: "auto",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(59,130,246,0.1)",
          mb: 2,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
};

export default InfoCard;