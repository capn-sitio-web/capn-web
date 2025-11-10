import { Avatar, Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

interface FlatIconCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FlatIconCard: React.FC<FlatIconCardProps> = ({ icon, title, description }) => {
  return (
    <Box 
			borderRadius={3}
			textAlign="center"
			p={2}
			height="100%"
		>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Avatar sx={{ color: blue[600], bgcolor: "rgba(59,130,246,0.1)", width: 64, height: 64 }}>
          {icon}
        </Avatar>
      </Box>
      <Typography variant="h6" color="text.primary" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
};

export default FlatIconCard;