import React, { useState } from 'react';
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { KeyboardBackspace, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../app/routes";
import { authService } from "../data/auth.service";
import { loginSchema, type LoginFormErrors, type LoginFormValues } from "../domain/login.validation";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState("");

  const handleChange =
    (field: keyof LoginFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));

      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));

      setBackendError("");
    };

  const validarFormulario = (): boolean => {
    const result = loginSchema.safeParse(form);
    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: LoginFormErrors = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof LoginFormValues;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });

    setErrors(fieldErrors);
    return false;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formularioValido = validarFormulario();
    if (!formularioValido) {
      return;
    }

    try {
      setLoading(true);
      await authService.iniciarSesion(form);
      navigate(ROUTES.ADMIN);
    } catch (err: unknown) {
      let message = "No se pudo iniciar sesión.";
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }
      setBackendError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
      }}
    >
      {/* Panel izquierdo */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
          bgcolor: '#f7f7f7',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: 360,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#1f1f1f',
              mb: 4,
              fontSize: { xs: '1.8rem', sm: '2.1rem' },
            }}
          >
            Iniciar Sesión
          </Typography>

          {backendError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {backendError}
            </Alert>
          )}
          
          <TextField
            fullWidth
            label="Correo electrónico"
            focused
            value={form.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mb: 4, }}
          />

          <TextField
            fullWidth
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            focused
            value={form.password}
            onChange={handleChange('password')}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    size="small"
                  >
                    {showPassword ? (
                      <Visibility sx={{ color: '#b0b0b0' }} />
                    ) : (
                      <VisibilityOff sx={{ color: '#b0b0b0' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3, }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              mb: 2,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Iniciar sesión"}
          </Button>

          <Button
            fullWidth
            startIcon={<KeyboardBackspace />}
            onClick={handleGoBack}
            sx={{
              textTransform: 'none',
              color: '#444',
            }}
          >
            Volver al sitio web
          </Button>
        </Box>
      </Box>

      {/* Panel derecho */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          width: '50%',
          minHeight: '100vh',
          backgroundImage:
            'url("https://images.unsplash.com/photo-1644088379091-d574269d422f?auto=format&fit=crop&w=1200&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Box>
  );
};

export default LoginPage;
