import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        white: "pink",
      },
      boxShadow: {
        "start-screen-card": "0px 8px 46.8px -13px #13518F",
      },
    },
    plugins: [],
  },
};

export default config;
