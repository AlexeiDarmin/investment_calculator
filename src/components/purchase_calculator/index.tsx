import * as React from 'react';
import { connect } from 'react-redux';
import { updateField, addComponent } from '../../actions/index';
import { StoreState } from '../../types/index';

interface Props {
  id: string
  component?: any
  updateField?: any
  addComponent?: any
  key: string
}

class PurchaseCalculator extends React.PureComponent<Props> {

  componentWillMount(){
    const { addComponent, id } = this.props
    
    addComponent(id)
  }

  componentWillUnmount(){
    //removeComponent(id)
  }

  handleOnChange = (e: any) => {
    const { name, value } = e.target
    const { shareQuantity, sharePrice, subTotal } = Object.assign({}, this.props.component, { [name]: value })
    const { updateField, id } = this.props

    let fields = { ...this.props.component }
    if (name === 'shareQuantity' || name === 'sharePrice') {
      fields = {
        shareQuantity,
        sharePrice,
        subTotal: shareQuantity * sharePrice,
      }
    } else if (name === 'subTotal') {
      fields = {
        shareQuantity: subTotal / sharePrice,
        sharePrice,
        subTotal
      }
    }

    updateField(id, fields)
  }

  render() {
    if (!this.props.component) return null

    const { id } = this.props
    const { shareQuantity = 0, sharePrice = 0, subTotal = 0 } = this.props.component

    return (<div className="calculatorContainer" key={id}>
      <h3>Purchase</h3>
      <label htmlFor="shareQuantity" className="rowData">Share quantity</label>
      <input name="shareQuantity" value={shareQuantity} onChange={this.handleOnChange} className="rowData" />

      <label htmlFor="sharePrice" className="rowData">Share price</label>
      <input name="sharePrice" value={sharePrice} onChange={this.handleOnChange} className="rowData" />

      <label htmlFor="subTotal" className="rowData">Subtotal</label>
      <input name="subTotal" value={subTotal} onChange={this.handleOnChange} className="rowData" />
    </div>)
  }

}

function mapStateToProps(state: StoreState, props: Props) {
  return {
    component: state.components[props.id],
    id: props.id
  }
}

export default connect(mapStateToProps, { updateField, addComponent })(PurchaseCalculator as any);