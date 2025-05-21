export const isDebug = () => process?.env?.NODE_ENV === 'development';

export const getDomain = () =>
  isDebug() ? 'http://localhost:3000' : process?.env?.NEXT_PUBLIC_API_URL;

export const getStrapiDomain = () => process?.env?.NEXT_PUBLIC_CMS_URL || '';
export const getAPIDomain = () => process?.env?.NEXT_PUBLIC_API_URL || '';
export const getfirebaseKey = () => process?.env?.NEXT_PUBLIC_FB_KEY || '';
export const getFirebaseProjectId = () =>
  process?.env?.NEXT_PUBLIC_FB_PROJECT_ID || '';
export const getFirebaseStorageBucket = () =>
  process?.env?.NEXT_PUBLIC_FB_STORAGE_BUCKET || '';
export const getFirebaseAppId = () =>
  process?.env?.NEXT_PUBLIC_FB_APP_ID || '';
export const getFirebaseAuthDomain = () =>
  process?.env?.NEXT_PUBLIC_FB_AUTH_DOMAIN || '';
export const getFirebaseMessagingSenderId = () =>
  process?.env?.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID || '';

export const getGAID = () => process?.env?.NEXT_PUBLIC_GA_ID || '';

export const getPlayLink = () => process?.env?.NEXT_PUBLIC_PLAY_LINK || '/';
