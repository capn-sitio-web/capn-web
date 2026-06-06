import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

interface NewsGallerySectionProps {
  images: string[];
}

const NewsGallerySection = ({ images }: NewsGallerySectionProps) => {
  return (
    <Box py={8}>
      <Container>
        <Typography
          variant="h4"
          color="text.primary"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Galería de Imágenes
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {images.map((image, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                component="img"
                src={image}
                alt={`Galería ${index}`}
                sx={{
                  width: "100%",
                  height: 280,
                  objectFit: "cover",
                  borderRadius: 3,
                  boxShadow:
                    "0 6px 18px rgba(0,0,0,0.08)",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default NewsGallerySection;
