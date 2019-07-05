module.exports = {
  theme: {
    extend: {
      spacing: {
        "80": "20rem",
        "108": "27rem",
      },
      borderWidth: {
        "14": "14px",
      },
      colors: {
        background: {
          primary: "var(--bg-background-primary)",
          secondary: "var(--bg-background-secondary)",
          tertiary: "var(--bg-background-tertiary)",

          form: "var(--bg-background-form)",
        },

        copy: {
          primary: "var(--text-copy-primary)",
          secondary: "var(--text-copy-hover)",
        },

        "border-color": {
          primary: "var(--border-border-color-primary)",
        },
      },
    },
    container: {
      padding: "1rem",
    },
    fontFamily: {
      sans: [
        "Nunito Sans",
        "Roboto",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
      mono: [
        "Menlo",
        "Monaco",
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace",
      ],
    },
  },
  variants: {
    // Some useful comment
  },
  plugins: [
    // Some useful comment
  ],
};
