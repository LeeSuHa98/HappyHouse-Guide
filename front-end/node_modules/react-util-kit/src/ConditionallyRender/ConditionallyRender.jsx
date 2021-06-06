import React, { Component } from 'react';
class ConditionallyRender extends Component {
  render() {
    const { ifTrue, show, elseShow } = this.props;
    return (
      <React.Fragment>
        {ifTrue && show}
        {elseShow && !ifTrue && elseShow}
      </React.Fragment>
    );
  }
}

export default ConditionallyRender;
