import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.jsx";
import { TodoContextProvider } from "./context/TodoContext.jsx";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <TodoContextProvider>
            <ThemeContextProvider>
                
                <App />
            </ThemeContextProvider>
        </TodoContextProvider>
    </StrictMode>
);
