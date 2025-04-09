import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CentroAtencionForm from "./components/CentroAtencionForm";
//import CineQueue from "./components/CineQueue"; // <- Agregá esto
import "./Styles.css";

export default function App() {
  return (
    <Provider store={store}>
      <div className="app-wrapper">
        <CentroAtencionForm />
      </div>
    </Provider>
  );
}
