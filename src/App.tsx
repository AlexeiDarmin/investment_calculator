import * as React from 'react';
import './App.css';
import PurchaseCalculator from './components/purchase_calculator/index';
import SellCalculator from './components/sell_calculator/index';


const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Financial Calculator</h2>
        </div>
        <p className="App-intro">
          <PurchaseCalculator />
          <SellCalculator />
        </p>
      </div>
    );
  }
}

export default App;
