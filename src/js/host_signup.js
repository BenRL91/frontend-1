import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import SSF from 'react-simple-serial-form';
import cookie from 'js-cookie';

export default class HostSignUp extends Component {
  dataHandler(){
    console.log('hey')
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
