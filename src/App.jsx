import { Component } from "react";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import Main from "./component/Mainarea";
import { Provider } from "react-redux";
import store from "./features/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Layout from "./component/Layout";

function App() {
  return (
    <Layout>
      <div className=" h-screen grid grid-cols-9">
        <Sidebar />
        <Main />
      </div>
    </Layout>
  );
}

export default App;
