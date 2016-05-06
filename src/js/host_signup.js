import React, { PropTypes, Component } from 'react';
import { Link, hashHistory } from 'react-router';
import SSF from 'react-simple-serial-form';
import { ajax } from 'jquery';
import cookie from 'js-cookie';

export default class HostSignUp extends Component {

  dataHandler(data){
    let user = cookie.getJSON('current_user').current_user
    console.log(cookie.getJSON('current_user'))
    let user_id = cookie.getJSON('current_user').current_user.id
    let token = cookie.getJSON('current_user').current_user.auth_token
    data.first_name = user.first_name
    data.last_name = user.last_name
    ajax({
      url:`http://salty-river-31528.herokuapp.com/users/${user_id}`,
      type: 'PUT',
      data: data,
      headers: {
        'Auth-Token': token
      }
    }).then(resp => {
      console.log(resp)
      let current_user = cookie.getJSON('current_user').current_user
      current_user.driver = true
      cookie.set('current_user', { current_user });
      console.log(cookie.getJSON('current_user'))
      hashHistory.push('/hosttripbooking')
      this.props.onSignIn()
    }).fail(e => console.log(e))
  }
  render(){
    return (
      <div className="host-signup">
        <SSF className="ssf" onData={::this.dataHandler}>
          <input
            type='tel'
            name='phone'
            placeholder='Phone Number'/>
          <textarea
            name='car_info'
            placeholder='Describe your vehicle'/>
          <input
            type='text'
            name='home_city'
            placeholder='Home City'/>
          <input
            type='text'
            name='license_plate'
            placeholder='License Plate'/>
          <input
            type='text'
            name='credit_card_number'
            placeholder='Credit Card Number'/>
          <button>Submit</button>
        </SSF>
      </div>
    )
  }
}
