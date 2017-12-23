import * as React from 'react';
import './App.css';
import PurchaseCalculator from './components/purchase_calculator/index';
import SellCalculator from './components/sell_calculator/index';
import SummaryCalculator from './components/summary_calculator/index';

import * as componentNames from './constants/component_names'
import { connect } from 'react-redux';
import { addComponent } from './actions/index';

const logo = require('./logo.svg');

interface Props {
  addComponent: any
}

class App extends React.Component<Props> {
  
  componentWillMount(){
    this.props.addComponent(componentNames.purchaseShares)
    this.props.addComponent(componentNames.sellShares)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Financial Calculator</h2>
        </div>
        <div className="App-intro">
          <PurchaseCalculator id={componentNames.purchaseShares} />
          <SellCalculator id={componentNames.sellShares} />
          <SummaryCalculator pid={componentNames.purchaseShares} sid={componentNames.sellShares} />
        </div>
      </div>
    );
  }
}

export default connect(null, { addComponent })(App as any)
