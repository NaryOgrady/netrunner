import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { createTheme, ThemeProvider } from '@mui/material'

import '@/styles/globals.css'
import { wrapper } from '@/store'
import { getFirebaseDatabase } from '@/db'

const firebaseConfig = {
  name: 'netrunner',
  apiKey: 'AIzaSyBWtDKK67q6vV5OUQLbwFUZIOJ-1F5HnB0',
  authDomain: 'netru-917d8.firebaseapp.com',
  projectId: 'netru-917d8',
  storageBucket: 'netru-917d8.appspot.com',
  messagingSenderId: '200164707611',
  appId: '1:200164707611:web:6a38f8674e0aba448a57be',
  database: 'https://netru-917d8-default-rtdb.firebaseio.com'
};

const app = initializeApp(firebaseConfig);
getFirebaseDatabase(app)

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});



export default function App({ Component, ...rest }: AppProps) {
  const { store, props} = wrapper.useWrappedStore(rest)
  return (
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </ThemeProvider>
  )
}
