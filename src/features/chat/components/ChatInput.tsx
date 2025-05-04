'use client';

import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
}

export const ChatInput = ({
  onSendMessage,
  placeholder = 'Escribe tu mensaje...',
  disableCorrections = false,
}: Props) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length === 0) return;

    onSendMessage(message);
    setMessage('');
  };

  return (
    <Box component="form" onSubmit={handleSendMessage} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <TextField
        fullWidth
        autoFocus
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        autoComplete={disableCorrections ? 'on' : 'off'}
        autoCorrect={disableCorrections ? 'on' : 'off'}
        spellCheck={!disableCorrections}
        variant="outlined"
        size="small"
        sx={{ backgroundColor: 'white', borderRadius: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" color="primary">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
