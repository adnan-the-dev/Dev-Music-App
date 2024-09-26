import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./global.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={true}
          closeButton={false}
          theme="colored"
          icon={false}
        />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
