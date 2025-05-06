"use client";

import { resetPassword } from "@features/auth/redux/thunks/auth.thunk";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useAppDispatch } from "@store/hooks/useAppDispatch";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    setSuccessMsg("");
    setErrorMsg("");
  
    if (!email) {
      setErrorMsg("Por favor, ingresa tu correo electrónico.");
      return;
    }
  
    setLoading(true);
    try {
      // ✅ Usa await y unwrap para capturar errores correctamente
      await dispatch(resetPassword(email)).unwrap();
      setSuccessMsg("Te hemos enviado un correo para restablecer tu contraseña.");
    } catch (error) {
        if (error instanceof Error) {
          setErrorMsg(error.message || "Hubo un problema desconocido.");
        } else {
          setErrorMsg("Hubo un problema desconocido.");
        }
      } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      p={2}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" mb={2}>
          ¿Olvidaste tu contraseña?
        </Typography>

        <Typography variant="body2" mb={2}>
          Ingresa tu correo electrónico y te enviaremos un enlace para
          restablecer tu contraseña.
        </Typography>

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}
        {successMsg && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMsg}
          </Alert>
        )}

        <TextField
          label="Correo electrónico"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Enviando..." : "Enviar enlace"}
        </Button>
      </Paper>
    </Box>
  );
}
