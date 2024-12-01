import { Component } from "react";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import Main from "./component/Mainarea";
import { Provider } from "react-redux";
import store  from "./features/store";
import { useSelector } from "react-redux";


function App(){
 

  return(
      <Provider  store={store}>
        
              <Header />
              <div className=" grid grid-cols-6">
                <Sidebar />
                <Main/>
              
              </div>
        
        
      </Provider>
  )
  
}

export default App;