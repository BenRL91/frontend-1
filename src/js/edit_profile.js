import React, { component } from 'react';
import { Link, hashHistory } from 'react-router';
import Dropzone from 'react-dropzone';
import cookie from 'js-cookie';
import { ajax } from 'jquery';

export default class EditProfile extends Component {
  render(){
    return (
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
    )}
}
