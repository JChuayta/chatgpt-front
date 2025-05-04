"use client";

import { registerWithEmail } from "@features/auth/redux/thunks/auth.thunk";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "@store/hooks/useAppDispatch";
import { FirebaseError } from "firebase/app";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const getErrorMessage = (code: string): string => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Este correo ya está registrado";
    case "auth/invalid-email":
      return "Correo electrónico inválido";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres";
    default:
      return "Error al registrar";
  }
};

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        await dispatch(registerWithEmail(form)).unwrap();
        router.push("/chat");
      } catch (error) {
        if (error instanceof FirebaseError) {
          setError(getErrorMessage(error.code));
        } else if (typeof error === "string") {
          setError(error);
        } else {
          setError("Ocurrió un error desconocido");
        }
        setLoading(false);
      }
    },
    [dispatch, router, form]
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Crear cuenta
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nombre"
            value={form.name}
            onChange={handleChange("name")}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Correo electrónico"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Contraseña"
            type="password"
            value={form.password}
            onChange={handleChange("password")}
            disabled={loading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Registrarse"
            )}
          </Button>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              ¿Ya tienes cuenta?{" "}
              <MuiLink component={NextLink} href="/login" underline="hover">
                Inicia sesión
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
