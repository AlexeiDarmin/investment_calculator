import * as React from 'react';
import './App.css';
import PurchaseCalculator from './components/purchase_calculator/index';
import SellCalculator from './components/sell_calculator/index';
import SummaryCalculator from './components/summary_calculator/index';
import Tab from './components/tab/index'

import * as componentNames from './constants/component_names'
import { connect } from 'react-redux';
import { addComponent } from './actions/index';
import { generateGuid } from './helpers/index'

const logo = require('./logo.svg');

interface Props {
  addComponent: any
}

interface State {
  tabs: Array<Tab>
  selectedTabId: string
}

interface Tab {
  id: string,
  name: string
}


class App extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props)
    
    this.state = {
      tabs: [],
      selectedTabId: ''
    }
  }
  

  componentWillMount(){
    this.createTab()
  }

  createTab = () => {
    const guid = generateGuid()
    const updatedTabs = this.state.tabs.slice()
    updatedTabs.push({
      id: guid,
      name: 'New tab'
    })

    this.setState({ tabs: updatedTabs, selectedTabId: guid })
  }

  renameTab = (e: any) => {
    const { name, value } = e.target
    const { tabs } = this.state

    const newTabs = tabs.slice()
    const tab = newTabs.find((tab) => tab.id === name)

    if (!tab) throw 'Tab should exist'

    tab.name = value

    this.setState({ tabs: newTabs })
  }

  renderTabs = () => {
    const { tabs, selectedTabId } = this.state

    return tabs.map((tab) => {
      const purchaseId = componentNames.purchaseShares + '_' + tab.id
      const sellId = componentNames.sellShares + '_' + tab.id

      return <Tab id={tab.id} name={tab.name} key={tab.id} selected={selectedTabId === tab.id}>
      <PurchaseCalculator id={purchaseId} key={purchaseId}/>
      <SellCalculator id={sellId} key={sellId} />
      <SummaryCalculator pid={purchaseId} sid={sellId} key={purchaseId + sellId}/>
    </Tab>
    })
  }

  selectTab = (id: string) => {
    this.setState({ selectedTabId: id })
  }

  renderTabNavigation = () => {
    const { tabs } = this.state

    return tabs.map((tab) => {
      return <input name={tab.id} value={tab.name} onClick={() => this.selectTab(tab.id)} onChange={this.renameTab}/>
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Financial Calculator</h2>
          <input onClick={this.createTab} placeholder="Create tab"/>
        </div>
        <div className="App-intro">
          {this.renderTabNavigation()}
          {this.renderTabs()}
        </div>
      </div>
    );
  }
}

export default connect(null, { addComponent })(App as any)
