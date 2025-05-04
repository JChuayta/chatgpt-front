import { User } from "firebase/auth";

export interface SerializableUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  providerId: string;
  tokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
  metadata: {
    creationTime?: string;
    lastSignInTime?: string;
  };
}

type StsTokenManager = {
  accessToken: string;
  expirationTime: number;
  refreshToken: string;
};

export const deserializeUser = (data: User): SerializableUser => {
  const stsTokenManager = (data as User & { stsTokenManager: StsTokenManager }).stsTokenManager;

  return {
    uid: data.uid,
    email: data.email,
    displayName: data.providerData?.[0]?.displayName ?? null,
    photoURL: data.providerData?.[0]?.photoURL ?? null,
    emailVerified: data.emailVerified,
    providerId: data.providerData?.[0]?.providerId ?? '',
    tokenManager: {
      accessToken: stsTokenManager.accessToken,
      expirationTime: stsTokenManager.expirationTime,
      refreshToken: stsTokenManager.refreshToken,
    },
    metadata: {
      creationTime: data.metadata.creationTime,
      lastSignInTime: data.metadata.lastSignInTime,
    },
  };
};
