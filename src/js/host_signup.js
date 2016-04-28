import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import SSF from 'react-simple-serial-form';
import { ajax } from 'jquery';
import cookie from 'js-cookie';

export default class HostSignUp extends Component {
  dataHandler(data){
    let user_id = cookie.getJSON('current_user').current_user.id
    let token = cookie.getJSON('current_user').current_user.auth_token
    ajax({
      url:`http://salty-river-31528.herokuapp.com/users/${user_id}`,
      type: 'PUT',
      data: {
        "first_name": "alan",
        "last_name": "smith",
        "phone": "4043234546",
        "car_info": 'black honda',
        "home_city": "Atlanta",
        "license_plate": "3e35",
        "license_number": "3445rf33",
        "credit_card_number": '34545'
      },
      headers: {
        'Auth-Token': token
      }
    }).then(resp => {
      console.log(resp)
      hashHistory.push('/hosttripbooking')
    }).fail(e => console.log(e))
  }
  render(){
    return (
      <div>
        <SSF onData={::this.dataHandler}>
          <input type='text' placeholder='enter your info to become a driver'/>
          <button>Submit</button>
        </SSF>
      </div>
    )
  }
}
