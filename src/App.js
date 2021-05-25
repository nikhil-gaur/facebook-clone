import React, { useState, useEffect} from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widgets from './Widgets';
import Login from './Login';
import { useStateValue } from './StateProvider';
import auth from './firebase';
import HeaderApp from './HeaderApp';

function App() {

  const [{user}, dispatch] = useStateValue();

  return (

    <div className="app">

    {!user ? ( <Login /> ) : (
      <>  
      {console.log(user)}
      <HeaderApp className="headerApp1"/>
      <Header className="header1"/>

      <div className="app__body">
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
      </>
    )}
      
  
    </div>
  );
}

export default App;

