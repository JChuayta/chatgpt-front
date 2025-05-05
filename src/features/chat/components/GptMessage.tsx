// 'use client';

// import { Avatar, Box, Paper, Typography } from '@mui/material';
// import Markdown from 'react-markdown';

// interface Props {
//   text: string;
// }

// export const GptMessage = ({ text }: Props) => {
//   return (
//     <Box display="flex" gap={2} alignItems="flex-start" px={2} py={1}>
//       <Avatar sx={{ bgcolor: 'success.main' }}>G</Avatar>

//       <Paper
//         elevation={3}
//         sx={{
//           backgroundColor: 'rgba(0,0,0,0.25)',
//           padding: 2,
//           borderRadius: 3,
//           maxWidth: '100%',
//         }}
//       >
//         <Typography
//           variant="body2"
//           sx={{
//             color: 'white',
//             '& a': { color: 'lightblue' },
//             '& code': {
//               backgroundColor: '#1e1e1e',
//               padding: '2px 4px',
//               borderRadius: '4px',
//               fontSize: '0.875em',
//             },
//           }}
//           component="div"
//         >
//           <Markdown>{text}</Markdown>
//         </Typography>
//       </Paper>
//     </Box>
//   );
// };
'use client';

import { Avatar, Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

interface Props {
  text: string;
  isLoading?: boolean;
}

export const GptMessage = ({ text, isLoading = false }: Props) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    if (isLoading) {
      setDisplayedText('');
      setCurrentIndex(0);
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 10); 

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, isLoading]);

  return (
    <Box display="flex" gap={2} alignItems="flex-start" px={2} py={1}>
      <Avatar sx={{ bgcolor: 'success.main' }}>G</Avatar>

      <Paper
        elevation={3}
        sx={{
          backgroundColor: 'rgba(0,0,0,0.25)',
          padding: 2,
          borderRadius: 3,
          maxWidth: '100%',
          minWidth: '60px', // Ancho mínimo para el loader
        }}
      >
        {isLoading ? (
          <Box display="flex" alignItems="center" gap={1}>
            <Box 
              sx={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.5)',
                animation: 'pulse 1.4s infinite ease-in-out',
                '&:nth-of-type(1)': { animationDelay: '0s' },
                '&:nth-of-type(2)': { animationDelay: '0.2s' },
                '&:nth-of-type(3)': { animationDelay: '0.4s' },
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 0.3, transform: 'scale(0.75)' },
                  '50%': { opacity: 1, transform: 'scale(1)' },
                },
              }}
            />
            <Box 
              sx={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.5)',
                animation: 'pulse 1.4s infinite ease-in-out',
                animationDelay: '0.2s',
              }}
            />
            <Box 
              sx={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.5)',
                animation: 'pulse 1.4s infinite ease-in-out',
                animationDelay: '0.4s',
              }}
            />
          </Box>
        ) : (
          <Typography
            variant="body2"
            sx={{
              color: 'white',
              '& a': { color: 'lightblue' },
              '& code': {
                backgroundColor: '#1e1e1e',
                padding: '2px 4px',
                borderRadius: '4px',
                fontSize: '0.875em',
              },
            }}
            component="div"
          >
            <Markdown>{displayedText}</Markdown>
          </Typography>
        )}
      </Paper>
    </Box>
  );
};