import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../types/index';

interface Props {
  pid: string
  sid: string
  purchaseComponent?: any
  sellComponent?: any
}

class SummaryCalculator extends React.PureComponent<Props> {

  getSummary = () => {
    const { subTotal: buySubTotal} = this.props.purchaseComponent
    const { subTotal: sellSubTotal} = this.props.sellComponent

    debugger
    return sellSubTotal - buySubTotal
  }

  render() {
    const difference = this.getSummary()

    return (<div className="calculatorContainer" style={{ width: '834px' }}>
      <h3>Summary</h3>
      <label htmlFor="difference" className="rowData">Difference</label>
      <input name="difference" value={difference} className="rowData" disabled />
    </div>)
  }
}

function mapStateToProps(state: StoreState, props: Props) {
  return {
    purchaseComponent: state.components[props.pid],
    sellComponent: state.components[props.sid]
  }
}

export default connect(mapStateToProps, {})(SummaryCalculator as any);