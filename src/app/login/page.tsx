"use client";

import GoogleButton from "@features/auth/components/GoogleButton";
import { setError } from "@features/auth/redux/slices/auth.slice";
import { loginWithEmail } from "@features/auth/redux/thunks/auth.thunk";
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
import { useAppSelector } from "@store/hooks/useAppSelector";
import { FirebaseError } from "firebase/app";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function getErrorMessage(code: string): string {
  const errorMessages: Record<string, string> = {
    "auth/invalid-email": "El formato del email es inválido",
    "auth/user-disabled": "Esta cuenta ha sido deshabilitada",
    "auth/user-not-found": "No existe una cuenta con este email",
    "auth/wrong-password": "Contraseña incorrecta",
    "auth/too-many-requests": "Demasiados intentos fallidos. Intenta más tarde",
  };

  return errorMessages[code] || "Error al iniciar sesión";
}
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(loginWithEmail({ email, password }));
      if (loginWithEmail.fulfilled.match(result)) {
        router.push("/chat");
      }
    } catch (err) {
      const message =
        err instanceof FirebaseError
          ? getErrorMessage(err.code)
          : "Ocurrió un error desconocido";

      dispatch(setError(message));
    }
  };
  const renderError = () =>
    error && (
      <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
        {error}
      </Alert>
    );
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>

        {renderError()}

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <MuiLink
              component={NextLink}
              href="/forgot-password"
              variant="body2"
              underline="hover"
            >
              ¿Olvidaste tu contraseña?
            </MuiLink>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 1, mb: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Iniciar sesión"
            )}
          </Button>

          <GoogleButton></GoogleButton>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              ¿No tienes cuenta?{" "}
              <MuiLink
                component={NextLink}
                href="/register"
                variant="body2"
                underline="hover"
              >
                Regístrate
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
