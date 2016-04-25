import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax, ajaxSetup } from 'jquery';

export default class Login extends Component {

  login(user_credentials){

    ajax({
      url: 'http://.../login',
      type: 'POST',
      data: user_credentials
    })
  }

  render(){


    return (
      <div className='login-wrapper'>
        <form>
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
        </form>
      </div>
    )
  }
}
