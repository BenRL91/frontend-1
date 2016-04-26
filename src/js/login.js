import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax, ajaxSetup } from 'jquery';
import SSF from 'react-simple-serial-form';
import cookie from 'js-cookie';
import firebaseAPI from 'firebase-api';

const users = firebaseAPI('lifteri').resource('users');

export default class Login extends Component {

  register(new_user_credentials) {
    ajax({
      url: 'https://salty-river-31528.herokuapp.com/register',
      type: 'POST',
      data: new_user_credentials
    }).then(resp => {
      ajaxSetup({
        headers: {
          'Auth-Token': resp.user.auth_token
        }
      })
      cookie.set('current_user', {current_user: resp.user})
    })
  }

  // register(new_user_credentials){
  //   users.post({ user: new_user_credentials}).then(response => {
  //     cookie.set('current_user', {current_user: response.user});
  //   })
  // }

  login(user_credentials){
    ajax({
      url: 'https://salty-river-31528.herokuapp.com/logins',
      type: 'POST',
      data: user_credentials
    })
  }
  // login(user_credentials){
  //   users.get({ user: user_credentials.})
  // }
  render(){

    return (
      <div className='login-wrapper'>
      {/*Login Form*/}
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
        {/*Registration Form*/}
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
                type='text'
                name='last_name'
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
