import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store.js";
import BootstrapAuth from "./BootstrapAuth"; // ✅ Importa o componente

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BootstrapAuth /> {/* ✅ Executa o efeito de restauração do usuário */}
      <App />
    </Provider>
  </React.StrictMode>,
);
