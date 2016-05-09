import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax, ajaxSetup } from 'jquery';
import SSF from 'react-simple-serial-form';
import cookie from 'js-cookie';
import Dropzone from 'react-dropzone';

export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  }
  constructor(...args){
    super(...args)
    this.state={
      preview: 'http://fillmurray.com/50/50'
    }
  }


  register(new_user_credentials) {
    let data = new FormData;
    data.append('first_name', new_user_credentials.first_name)
    data.append('last_name', new_user_credentials.last_name)
    data.append('user_name', new_user_credentials.user_name)
    data.append('email', new_user_credentials.email)
    data.append('password', new_user_credentials.password)
    data.append('image', this.file)


    ajax({
      url: 'https://salty-river-31528.herokuapp.com/register',
      type: 'POST',
      data: data,
      dataType: 'JSON',
      cache: false,
      processData: false,
      contentType: false

    }).then(resp => {
        console.log(resp)
        cookie.set('current_user', {current_user: resp.user})
        ajaxSetup({
          headers: {
            'Auth-Token': resp.user.auth_token
          }
        })
        this.props.onLogin()
      })
    }


  login(user_credentials){
    ajax({
      url: 'https://salty-river-31528.herokuapp.com/logins',
      type: 'POST',
      data: user_credentials
    }).then(resp => {
        console.log(resp)
        cookie.set('current_user', {current_user: resp.user})
        ajaxSetup({
          headers: {
            'Auth-Token': resp.user.auth_token
          }
        })
        this.props.onLogin()
      })
    }


  dropHandler([file]){
    this.setState({
      preview: file.preview
    })
    this.file= file
  }



  render(){

    return (
      <div className='login-wrapper'>
      {/*Login Form*/}
      <SSF className='login-form' onData={::this.login}>
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

            <Dropzone onDrop={::this.dropHandler}> <img src={this.state.preview}/> </Dropzone>

            <button>Register</button>
        </SSF>
      </div>
    )
  }
}
