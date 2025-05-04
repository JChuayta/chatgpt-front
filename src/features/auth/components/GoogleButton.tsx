'use client';

import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import { useAppDispatch } from '@store/hooks/useAppDispatch';
import { useRouter } from 'next/navigation';
import { loginWithGoogle } from '../redux/thunks/auth.thunk';

export default function GoogleButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const result = await dispatch(loginWithGoogle());
    if (loginWithGoogle.fulfilled.match(result)) {
      router.push('/chat');
    }
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={handleGoogleLogin}
      sx={{
        mt: 2,
        mb: 2,
        py: 1.5,
        borderColor: 'grey.300',
        color: 'text.primary',
        '&:hover': {
          borderColor: 'grey.400',
          backgroundColor: 'action.hover',
        },
      }}
    >
      Continuar con Google
    </Button>
  );
}