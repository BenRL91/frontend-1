import React, { Component, PropTypes } from 'react';

export default function requireLogin() {
  return WrappedComponent => {
    return class LoginWrapper extends Component {
      static contextTypes = {
        requireLogin: PropTypes.func.isRequired
      }

      componentWillMount() {
        this.context.requireLogin();
      }

      render() {
        return (
          <WrappedComponent/>
        );
      }
    }
  }
}