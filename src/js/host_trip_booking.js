import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax } from 'jquery';
import token from './token';
import SSF from 'react-simple-serial-form';
import cookie from 'js-cookie';
import Modal from './modal';
import LoginAtTripCreation from './login_at_trip_creation';

export default class HostTripBooking extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      current_user: null,
      user_is_driver: false,
      showLogin: false,
    }
  }
    componentWillMount(){
      let current_user = cookie.getJSON('current_user')
      ? cookie.getJSON('current_user').current_user
      : null;
      let user_is_driver = current_user
      ? current_user.driver
      : false;
        this.setState({
          current_user,
          user_is_driver
        });
    }

  loginHandler(){
    let current_user = cookie.getJSON('current_user')
    ? cookie.getJSON('current_user').current_user
    : null;
      this.setState({ current_user });
    if (current_user){
      this.hideLoginHandler()
      this.props.loginCheck()
    }
  }
  showLoginHandler() {
    let { current_user } = this.state;
    if(!current_user){
      this.setState({showLogin: true})
    }
  }

  hideLoginHandler() {
      this.setState({showLogin: false});
  }

  book(trip_details){
    let { current_user, showLogin } = this.state;
    if(!current_user){
      this.setState({showLogin: true})
    }else {
      ajax({
        url: 'https://salty-river-31528.herokuapp.com/hosts',
        type: 'POST',
        data: trip_details
      }).then( resp => {
        console.log(resp)
      hashHistory.push('/driverconfirmation')
    })
  }
}
  render(){
    let { showLogin, driver_info } = this.state;
    return (
      <div className="host-booking-wrapper">
     	 <SSF className='host-trip-form' onData={::this.book}>
           <label>
             Phone:
             <input
               type='tel'
               name='phone'
               placeholder='Phone Number'
               defaultValue={driver_info}/>
           </label>
     	 HOST TRIP BOOKING PAGE <br/><br/>

            <label>
              Departure City:
              <input
                type='text'
                name='departing_city'
                placeholder='Where are you leaving from?'/>
            </label>

              <input
                type='hidden'
                name='depart_latitude'/>

              <input
                type='hidden'
                name='depart_longitude'/>

            <label>
              Date:
              <input
                type='date'
                name='date_leave'
                placeholder='When are you leaving?'/>
            </label>

            <label>
              Destination:
              <input
                type='text'
                name='destination'
                placeholder='Where are you driving to?'/>
            </label>

              <input
                type='hidden'
                name='destination_longitude'/>

              <input
                type='hidden'
                name='destination_longitude'/>



            <label>
              Date:
              <input
                type='date'
                name='date_arrive'
                placeholder='Whats your ETA?'/>
            </label>

            <label>
              Seats Available:
              <input
                type='text'
                name='seats_available'
                placeholder='Number of seats you want to make available'/>
            </label>

            <label>
              Total Price:
              <input
                type='text'
                name='seat_price'
                placeholder='List the price for all seats'/>
            </label>


            <span className="host-span"> Tip: It looks like the estimate PPS (Price Per Seat) for your trip is $25,
            	you've listed 3 seats available. A suggested total is $75.
            	Riders will reserve seats ahead of time, and the price will go down for them
            	based on how many seats are filled.  But no worries, you will always get the total amount. </span>


             <label className="trip-description">
              Trip Description:
              <textarea
                type='text'
                name='comments'
                placeholder='tell us about your trip'>
            </textarea>
            </label>
            <button>HOST</button>
     	 </SSF>
       <Modal show={showLogin} onCloseRequest={::this.hideLoginHandler}>
         <LoginAtTripCreation onLogin={::this.loginHandler}/>
       </Modal>
      </div>
    )
  }
}
