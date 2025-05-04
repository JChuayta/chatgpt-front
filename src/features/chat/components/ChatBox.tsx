'use client';

import { Avatar, Box, Paper, Typography } from '@mui/material';

interface Props {
  text: string;
}

export const MyMessage = ({ text }: Props) => {
  return (
    <Box display="flex" gap={2} alignItems="flex-start" justifyContent="flex-end" px={2} py={1}>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: 'primary.dark',
          paddingY: 1,
          paddingX: 2,
          borderRadius: 3,
          color: 'white',
          maxWidth: '80%',
        }}
      >
        <Typography variant="body2">{text}</Typography>
      </Paper>

      <Avatar sx={{ bgcolor: 'primary.main' }}>F</Avatar>
    </Box>
  );
};
