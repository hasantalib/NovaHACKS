import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set up initial theme from localStorage or system preference
const setInitialTheme = () => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

setInitialTheme();

createRoot(document.getElementById("root")!).render(<App />);
