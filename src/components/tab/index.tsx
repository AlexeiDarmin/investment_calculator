import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../types/index';

interface Props {
    children: any
    id: string,
    name: string,
    selected: boolean
}

class Tab extends React.PureComponent<Props> {

  render() {
    const { children, selected } = this.props
    
    const customStyles = { display: selected ? 'block' : 'none'}

    return <div style={customStyles}>
        {children}
    </div>
  }
}

function mapStateToProps(state: StoreState, props: Props) {
    const { children } = props
    return {
      children
  }
}

export default connect(mapStateToProps, {})(Tab as any);