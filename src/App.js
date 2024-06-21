import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import beneficiariesReducer from "./redux/beneficiariesSlice";
import ManageBeneficiaries from "./components/ManageBeneficiaries";
import { Layout } from "antd";
import { BsPersonCircle } from "react-icons/bs";

const { Header } = Layout;

const store = configureStore({
  reducer: {
    beneficiaries: beneficiariesReducer,
  },
});

const App = () => (
  <Provider store={store}>
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#40407a",
      }}
    >
      <div className="demo-logo">
        <h5 style={{ color: "#fff" }}>Manage Beneficiary</h5>
      </div>
      <BsPersonCircle style={{ color: "#fff" }} />
    </Header>
    <Router>
      <Routes>
        <Route path="/" element={<ManageBeneficiaries />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
