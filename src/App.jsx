import { Component } from "react";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import { useState } from "react";
import { Provider } from "react-redux";
import store  from "./features/store";

function App(){
   
  return(
      <Provider store={store}>
        <div className="main h-full w-full bg-white  grid ">
          <Header />
          <Sidebar   />
        </div>
      </Provider>
  )
  
}

export default App;