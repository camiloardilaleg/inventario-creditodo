import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FormInv } from './components/FormInv';

import { GlobalProvider } from './context/GlobalState';


export function App() {
  
  return (
    // GlobalProvider help others components use the state. Only components inside GlobalProvider can use the state.
    <GlobalProvider> 
      <div className="App">
        <Navbar />
        <FormInv />
        <Footer />
      </div>
    </GlobalProvider>
  );
}

export default App;
