import React from 'react';
import './App.css';
import {observer} from 'mobx-react-lite';
import CurrencyConverter from './feature/CurrencyConverter/CurrencyConverter';


function App() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="container max-w-md">
        <CurrencyConverter first="BTC" second="USD" />
      </div>
    </div>
  );
}

export default observer(App);
