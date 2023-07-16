import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        padding: '0 1rem 1rem 1rem',
        maxWidth: '680px',
        margin: '0 auto',
        background: '#fff',
        color: '#333',
      },
      li: {
        lineHeight: '1.5rem',
      },
      p: {
        lineHeight: '1.5rem',
      },
      a: {
        fontWeight: '500',
      },
      hr: {
        border: '1px solid #ddd',
      },
      iframe: {
        // background: '#ccc',
        // border: '1px solid #ccc',
        // height: '10rem',
        // width: '100%',
        // borderRadius: '0.5rem',
        // filter: 'invert(1)',
      },
      html: {
        height: '100%',
      },
    },
  },
});
