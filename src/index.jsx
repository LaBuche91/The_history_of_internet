// index.jsx - Point d'entrée de l'application React
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Fonction pour masquer l'écran de chargement
const hideLoading = () => {
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.opacity = '0';
    setTimeout(() => {
      loadingElement.style.display = 'none';
    }, 500);
  }
};

// Rendu de l'application
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Masquer le loading après le rendu initial
setTimeout(hideLoading, 1000);
