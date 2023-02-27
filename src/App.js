import './App.scss';
import './assets/styles.scss';
import React  from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Firebase from "./Firebase/firebase.init";
import "./Core/Lang/lang_helper";
import {Toaster} from "react-hot-toast";
import Layout from './components/Layout/Layout';


function App() {
  Firebase();

  return (
      <div className="App" dir="ltr">



          <Layout />
          <Toaster />

      </div>
  );
}

export default App;
