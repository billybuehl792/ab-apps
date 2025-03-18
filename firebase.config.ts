// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export default {
  apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_PUBLIC_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN,
  measurementId: import.meta.env.VITE_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: import.meta.env.VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET,
};
