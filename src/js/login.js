import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax, ajaxSetup } from 'jquery';
import SSF from 'react-simple-serial-form';

export default class Login extends Component {

  register(new_user_credentials) {
    ajax({
      url: 'http://.../register',
      type: 'POST',
      data: new_user_credentials
    })
  }
  login(user_credentials){
    ajax({
      usl: 'http://.../login',
      type: 'POST',
      data: user_credentials
    })
  }
  render(){

    return (
      <div className='login-wrapper'>
      <SSF className='login-form' onData={::this.login}>
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
        <SSF className='register-form' onData={::this.register}>
            <label>
              First Name:
              <input
                type='text'
                name='first_name'
                placeholder='placeholder'/>
            </label>
            <label>
              Last Name:
              <input
                type='last_name'
                name='name-goes-here'
                placeholder='placeholder'/>
            </label>
            <label>
              Username:
              <input
                type='text'
                name='user_name'
                placeholder='placeholder'/>
            </label>
            <label>
              Email:
              <input
                type='text'
                name='email'
                placeholder='placeholder'/>
            </label>
            <label>
              Password:
              <input
                type='password'
                name='password'
                placeholder='placeholder'/>
            </label>
            <button>Register</button>
        </SSF>
      </div>
    )
  }
}
