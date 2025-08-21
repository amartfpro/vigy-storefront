export const appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#ff8c00", // naranja para bordes/focus
    colorText: "#374151",    // gris oscuro para textos
  },
  rules: {
    ".Input": {
      border: "1px solid",
      color: "#374151",
    },
    ".Input:focus": {
      borderColor: "#ff8c00",
    },
    ".Label": {
      color: "#374151",
    },
    ".Tab": {
      color: "#374151",
    },
    ".Tab--selected": {
      borderColor: "#ff8c00",
      color: "#374151",
    },
    ".Link": {
      color: "#374151",
    },
  },
}
