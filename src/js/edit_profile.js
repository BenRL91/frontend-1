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
      preview: 'http://fillmurray.com/50/50',
      current_user: null,
      loading: true
    }
  }

  componentWillMount(){
    let user = cookie.getJSON('current_user').current_user
    if (user){
        ajax({
        url: `https://salty-river-31528.herokuapp.com/profile/${user.id}`,
        type: 'GET',
        headers: {
          'Auth-Token': user.auth_token
        }
      }).then(resp => {
        this.setState({
          current_user: resp.user,
          preview: resp.user.pictures[0].image_url,
          loading: false
        })
      })
    }
  }
  edit_profile(user_details){
    let id = this.props.params.user_id;
    let user = cookie.getJSON('current_user').current_user
        let data = new FormData;
    data.append('first_name', user_details.first_name)
    data.append('last_name', user_details.last_name)
    data.append('user_name', user_details.user_name)
    data.append('email', user_details.email)
    data.append('image', this.file)
    ajax({
      url: `https://salty-river-31528.herokuapp.com/profile/${id}`,
      type: 'PUT',
      data: data,
      dataType: 'JSON',
      cache: false,
      processData: false,
      contentType: false,
      headers: {
        'Auth-Token': user.auth_token
      }

    }).then( resp => {
      console.log(resp)
      // cookie.set('current_trip', {current_trip: resp.trip)
      hashHistory.push('/myprofile')
    })
  }


    deleteHandler(){

    let id = this.props.params.user_id;

    ajax({
      url: `https://salty-river-31528.herokuapp.com/profile/${id}`,
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
  renderLoading(){
    return (
      <div>Loading...</div>
    )
  }
  renderPage(){
    let current_user = this.state.current_user;
    return (
    <div className="edit-profile-wrapper">

      <SSF className='register-form' onData={::this.edit_profile}>
        <label>
          First Name:
        <input
          type='text'
          name='first_name'
          defaultValue={current_user.first_name}
          placeholder='placeholder'/>
        </label>
        <label>
          Last Name:
        <input
          type='text'
          name='last_name'
          defaultValue={current_user.last_name}
          placeholder='placeholder'/>
        </label>
        <label>
          Username:
        <input
          type='text'
          name='user_name'
          defaultValue={current_user.user_name}
          placeholder='placeholder'/>
        </label>
        <label>
        Email:
        <input
          type='text'
          name='email'
          defaultValue={current_user.email}
          placeholder='placeholder'/>
        </label>

        <Dropzone onDrop={::this.dropHandler}> <img src={this.state.preview}/></Dropzone>

        <button>Save</button>
      </SSF>


       <button onClick={::this.deleteHandler} className="edit-profile-delete"> DELETE your account </button>
    </div>

    )}

    render(){
      let loading = this.state.loading;
      return (
        loading
        ? this.renderLoading()
        : this.renderPage()
      )
    }
  }
