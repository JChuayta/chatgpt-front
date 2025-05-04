'use client';

import { Box, keyframes } from '@mui/material';

interface Props {
  className?: string;
}

const typingAnimation = keyframes`
  0% { transform: scale(1); }
  33% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); }
`;

export const TypingLoader = ({ className }: Props) => {
  return (
    <Box
      className={className}
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="60px"
      height="40px"
      borderRadius="20px"
      bgcolor="#f2f2f2"
      mx={2}
    >
      {[0, 1, 2].map((index) => (
        <Box
          key={index}
          component="span"
          sx={{
            height: 10,
            width: 10,
            borderRadius: '50%',
            backgroundColor: '#8d8d8d',
            margin: '3px',
            animation: `${typingAnimation} 1000ms ease-in-out infinite`,
            animationDelay: `${index * 333}ms`,
          }}
        />
      ))}
    </Box>
  );
};
