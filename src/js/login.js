import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax, ajaxSetup } from 'jquery';
import SSF from 'react-simple-serial-form';

export default class Login extends Component {

  datHandler(user_credentials) {
    console.log('user', user_credentials)
    ajax({
      url: 'http://.../login',
      type: 'POST',
      data: user_credentials
    })
  }
  render(){
    let messages = { required: 'You must enter a username and password.'}

    return (
      <div className='login-wrapper'>
      <SSF onData={::this.datHandler}>
          {/*Have not decided on names yet*/}
          <label>
            Username:
            <input
              type='text'
              name='user_name'
              placeholder='Type Your Username'/>
          </label>
          <label>
            Password:
            <input
              type='password'
              name='password'
              placeholder='Type Your Password'/>
          </label>
          <button>Log In</button>
        </SSF>
      </div>
    )
  }
}
