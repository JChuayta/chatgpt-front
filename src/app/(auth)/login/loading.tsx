"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box>
      <CircularProgress color="inherit" size={60} />
      <Typography variant="h6" mt={2}>
        Cargando...
      </Typography>
    </Box>
  );
}
