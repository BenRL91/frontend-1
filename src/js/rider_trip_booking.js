import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import SSF from 'react-simple-serial-form';
import { ajax } from 'jquery';
import cookie from 'js-cookie';
import Modal from './modal';
import LoginAtTripBook from './login_rider_booking';

       //// add me to route to RIDER TRIP BOOKED AFTER COOKIE.SET // hashHistory.push('/tripdetails');


// PUT REQUEST/////
///need to make this so that were just sending backend the user ID because the CC info is dummy data//////

export default class RiderTripBooking extends Component {
	constructor(...args){
		super(...args);
		this.state = {
			current_user: null,
			showLogin: false
		}
	}
		componentWillMount(){
			console.log('mounting')
			let current_user = cookie.getJSON('current_user')
			? cookie.getJSON('current_user').current_user
			: null;
			this.setState({current_user})
		}

	loginHandler(){
		console.log('logging in')
		let current_user = cookie.getJSON('current_user')
		? cookie.getJSON('current_user').current_user
		: null;
			this.setState({ current_user });
			if (current_user){
				this.hideLoginHandler()
			}
	}
	showLoginHandler() {
		console.log('showing');
		let { current_user } = this.state;
		console.log('current_user', current_user)
		if(!current_user){
			this.setState({showLogin: true})
		}
	}
	hideLoginHandler() {
		console.log('hiding')
		let current_user = cookie.getJSON('current_user')
		? cookie.getJSON('current_user').current_user
		: null;
			this.setState({showLogin: false, current_user  });
	}

	  book(bookingInfo) {
			console.log('trying to book')
			let {id} = this.props.params;
			let current_user = cookie.getJSON('current_user')
			? cookie.getJSON('current_user').current_user
			: null;
				this.setState({
					current_user
				});
			if (current_user){
				ajax({
					url: `https://salty-river-31528.herokuapp.com/riders/${id}`,
					type: 'PUT'
				}).then(resp => {
					console.log('resp', resp)
					hashHistory.push('/riderconfirmation')})
					.fail(e => alert(`You've already booked this trip!`))
	}else {
		this.setState({ showLogin: true})
	}
}

fakeFunction(){
	return;
}

  render(){
		let { showLogin } = this.state;
    return (
      <div className="rider-trip-booking-wrapper">


      <SSF className='rider-trip-booking' onData={::this.fakeFunction}>

      		<span> seats left on this trip ..interpolate.. </span>


            <span> Your price ..interpolate.. $80 </span><br/>
            <span> You won't be charge for this trip until the day of departure,<br/>
            this will leave time for other riders to book a seat, and lower the price for you (& them). </span>

            <label>
              Name as it appears on card:
              <input
                type='text'
                name='name_on_card'
                placeholder='first last'/>
            </label>

            <label>
              Card Number:
              <input
                type='text'
                name='credit_card_number'
                placeholder='CC number here'/>
            </label>

            <label>
              Expiration Date:
              <input
                type='date'
                name='expiration_date'
                placeholder='MM/YY format'/>
            </label>
            <label>
              3 digit security code:
              <input
                type='text'
                name='security_code'
                placeholder='###'/>
            </label>




        </SSF>
				<SSF onData={::this.book}>
					Add me to the trip!
					<input
						type='hidden'
						name='user_id'/>
					<button>Book This Trip</button>
				</SSF>
				<Modal show={showLogin} onCloseRequest={::this.hideLoginHandler}>
          <LoginAtTripBook onLogin={::this.loginHandler}/>
        </Modal>
      </div>
    )
  }
}
