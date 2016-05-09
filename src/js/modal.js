import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


export default class Modal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onCloseRequest: PropTypes.func.isRequired
  }

  render(){
    console.log('rendering modal')
    let wrapperClass = classnames('modal-wrapper', {shown: this.props.show})
    return (
      <div className={wrapperClass}>
        <div className="modal-overlay" onClick={this.props.onCloseRequest}/>
        <div className="modal-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}
