import { MantineProvider } from '@mantine/core';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        colors: {
          dark: [
            '#36393F', // 0: Background
            '#2F3136', // 1: Editor background
            '#202225', // 2: Borders
            '#B9BBBE', // 3: Text
            '#FFFFFF'  // 4: White text
          ]
        },
        components: {
          Container: {
            defaultProps: {
              sizes: {
                xs: 540,
                sm: 720,
                md: 960,
                lg: 1140,
                xl: 1320,
              },
            },
          },
        }
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}