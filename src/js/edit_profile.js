import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import Dropzone from 'react-dropzone';
import cookie from 'js-cookie';
import { ajax } from 'jquery';
import SSF from 'react-simple-serial-form';

export default class EditProfile extends Component {
  constructor(...args){
    super(...args)
    this.state={
      preview: 'http://fillmurray.com/50/50'
    }
  }


  edit_profile(user_details){
    let id = this.props.params.user_id;
        let data = new FormData;
    data.append('first_name', user_details.first_name)
    data.append('last_name', user_details.last_name)
    data.append('user_name', user_details.user_name)
    data.append('email', user_details.email)
    data.append('password', user_details.password)
    data.append('pictures', this.file)
    ajax({
      url: `https://salty-river-31528.herokuapp.com/users/${id}`,
      type: 'PUT',
      data: data,
      dataType: 'JSON',
      cache: false,
      processData: false,
      contentType: false

    }).then( resp => {
      console.log(resp)
      // cookie.set('current_trip', {current_trip: resp.trip)
      hashHistory.push('/myprofile')
    })
  }


    deleteHandler(){

    let id = this.props.params.user_id;

    ajax({
      url: `https://salty-river-31528.herokuapp.com/users/${id}`,
      type: 'DELETE'
    }).then( resp => {
      console.log(resp)
      // cookie.set('current_trip', {current_trip: resp.trip)
      hashHistory.push('/')
    })
  }

  dropHandler([file]){
    this.setState({
      preview: file.preview
    })
    this.file= file
    console.log('file', this.file)
  }


  render(){
    return (
    <div className="edit-profile-wrapper">

      <SSF className='register-form' onData={::this.edit_profile}>
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

        <Dropzone onDrop={::this.dropHandler}> <img src={this.state.preview}/> dropzone </Dropzone>

        <button>Save</button>
      </SSF>


       <button onClick={::this.deleteHandler} className="edit-profile-delete"> DELETE your account </button>
    </div>

    )}
}
