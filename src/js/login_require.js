import React, { Component, PropTypes } from 'react';

export default function requireLogin() {
  return WrappedComponent => {
    return class LoginWrapper extends Component {
      static contextTypes = {
        requireLogin: PropTypes.func.isRequired
      }

      componentWillMount() {
        this.context.requireLogin(true);
      }

      componentWillUnmount() {
        this.context.requireLogin(false);
      }


      render() {
        return (
          <WrappedComponent/>
        );
      }
    }
  }
}
