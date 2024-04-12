import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Google Sans, sans-serif",
    htmlFontSize: 14,
    color: "#222222",

    h1: {
      fontSize: "2.5rem",
      fontWeight: "600",
      lineHeight: "1.2",
      '@media (max-width:1200px)': {
        fontSize: '2rem',
      },
      '@media (max-width:900px)': {
        fontSize: '1.8rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.30rem',
      },
     
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "500",
      lineHeight: "1.25",
      '@media (max-width:1200px)': {
        fontSize: '1.65rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },

    h3: {
      fontSize: "1.75rem",
      fontWeight: "500",
      lineHeight: "1.3",
      '@media (max-width:1200px)': {
        fontSize: '1.45rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: "400",
      lineHeight: "1.35",
      lineHeight: "1.3",
      '@media (max-width:1200px)': {
        fontSize: '1.10rem',
      },
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: "500",
      lineHeight: "1.4",
      '@media (max-width:900px)': {
        fontSize: '1rem',
      },
      
    },
    h6: {
      fontSize: "1rem",
      fontWeight: "500",
      lineHeight: "1.5",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: "400",
      lineHeight: "1.5",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: "500",
      lineHeight: "1.4",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: "400",
      lineHeight: "1.5",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: "400",
      lineHeight: "1.43",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: "0.025em",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: "1.66",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },
    secondary: {
      fontSize: "0.875rem",
      fontWeight: "400",
      lineHeight: "1.4",
      color: "rgba(0, 0, 0, 0.45)",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#ffffff",
          padding: "16px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          color: "#222222 !important",
          borderRadius: "8px",
        },
      },
    },    
  },
});

export default theme;
