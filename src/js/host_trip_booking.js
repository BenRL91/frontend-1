import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax } from 'jquery';
import token from './token';
import SSF from 'react-simple-serial-form';
import cookie from 'js-cookie';
import Modal from './modal';
import LoginAtTripCreation from './login_at_trip_creation';
import GeoSuggest from 'react-geosuggest';

let latA, lngA, latB, lngB;

export default class HostTripBooking extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      current_user: null,
      user_is_driver: false,
      showLogin: false,
      driver_info: {
        first_name: "",
        last_name: "",
        home_city: "",
        car_info: "",
        phone: "",
        credit_card_number: "",
        license_plate: "",
        license_number: ""
      },
      loading: true,
      suggested_price: 'Suggested Price',
      processing: false
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
    if (current_user){
      ajax(`https://salty-river-31528.herokuapp.com/profile/${current_user.id}`)
      .then( profile => {
        this.setState({
          driver_info: {
            car_info: profile.user.car_info,
            phone: profile.user.phone,
            credit_card_number: profile.user.credit_card_number,
            license_plate: profile.user.license_plate,
            license_number: profile.user.license_number,
            first_name: profile.user.first_name,
            last_name: profile.user.last_name,
            home_city: profile.user.home_city,

          },
          loading: false
        })
      })
    }else {
      this.setState({loading: false})
    }
  }

  loginHandler(){
    let current_user = cookie.getJSON('current_user')
    ? cookie.getJSON('current_user').current_user
    : null;
      this.setState({ current_user });
    if (current_user){
      this.hideLoginHandler()
    }
  }
  showLoginHandler() {
    let { current_user } = this.state;
    console.log('current_user', current_user)
    if(!current_user){
      this.setState({showLogin: true})
    }
  }
  hideLoginHandler() {
    let current_user = cookie.getJSON('current_user')
    ? cookie.getJSON('current_user').current_user
    : null;
      this.setState({showLogin: false, current_user  });
  }
  getSuggestedPrice(xA, yA, xB, yB){
    if(xA === undefined || xB === undefined){
      return 'You must select a departure location and a destination to calculate a price.'
    }else {
      this.setState({processing: true})
      ajax({
        url: 'https://salty-river-31528.herokuapp.com/pps/',
        type: 'POST',
        data: {
          depart_latitude: xA,
          depart_longitude: yA,
          destination_latitude: xB,
          destination_longitude: yB
        }
      }).then(price => {
        this.setState({suggested_price: Math.abs(price.total_price.toFixed(2)), processing: false})
      })
    }
  }
  book(data){
    let driver_details = {};
    let trip_info = {};
    driver_details.phone = data.phone
    driver_details.car_info = data.car_info
    driver_details.license_plate = data.license_plate
    driver_details.license_number = data.license_number
    driver_details.credit_card_number = data.credit_card_number
    driver_details.first_name = data.first_name
    driver_details.last_name = data.last_name
    driver_details.home_city = data.home_city

    trip_info.depart_latitude = latA;
    trip_info.depart_longitude = lngA;
    trip_info.destination_latitude = latB;
    trip_info.destination_longitude = lngB;
    trip_info.departing_city = data.departing_city;
    trip_info.date_leave = data.date_leave;
    trip_info.date_arrive = data.date_arrive;
    trip_info.destination = data.destination;
    trip_info.seats_available = data.seats_available;
    trip_info.comments = data.comments;
    trip_info.seat_price = data.seat_price;
    let { current_user, showLogin } = this.state;
    console.log('current_user', current_user)
    if(!current_user){
      this.setState({showLogin: true})
    }else {
      ajax({
        url: 'https://salty-river-31528.herokuapp.com/hosts',
        type: 'POST',
        data: trip_info
      }).then( resp => {
        console.log(resp)
      ajax({
        url: `https://salty-river-31528.herokuapp.com/users/${current_user.id}`,
        type: 'PUT',
        data: driver_details
      })
      hashHistory.push('/driverconfirmation')
    })
  }
}
onSuggestSelectDepart(suggest) {
  console.log(suggest);
  latA = suggest.location.lat;
  lngA = suggest.location.lng;
  this.getSuggestedPrice(latA, lngA, latB, lngB)
}
onSuggestSelectDest(suggest) {
  console.log(suggest);
  latB = suggest.location.lat;
  lngB = suggest.location.lng;
  this.getSuggestedPrice(latA, lngA, latB, lngB)
}
dataHandler(query){
  console.log('query', query)
  query.latA = latA;
  query.lngA = lngA;
  query.latB = latB;
  query.lngB = lngB;
  console.log('latA, longA', latA, lngA)
  console.log('latB, longB', latB, lngB)

}
processing(){
  return (
    'Estimating...'
  )
}
renderLoading(){
  return (
    <i className="fa fa-spinner" aria-hidden="true"></i>
  )
}
renderPage(){
  let { showLogin, driver_info, suggested_price, processing } = this.state;
  return (
    <div className="host-booking-wrapper">
     <SSF className='host-trip-form' onData={::this.book}>
     <b>SIGN UP TO HOST YOUR OWN TRIP</b> <br/>
     <i className="fa fa-road" aria-hidden="true"></i>

     <br/>​
         <label>
           First Name:
           <input
             type='text'
             name='first_name'
             placeholder='First Name'
             defaultValue={driver_info.first_name}/>
         </label>
         <label>
           Last Name:
           <input
             type='text'
             name='last_name'
             placeholder='Last Name'
             defaultValue={driver_info.last_name}/>
         </label>
         <label>
           Home City:
           <input
             type='text'
             name='home_city'
             placeholder='Home City'
             defaultValue={driver_info.home_city}/>
         </label>
         <label>
           Phone:
           <input
             type='tel'
             name='phone'
             placeholder='Phone Number'
             defaultValue={driver_info.phone}/>
         </label>
         <label>
           Credit Card Info:
           <input
             type='text'
             name='credit_card_number'
             placeholder='Credit Card Number'
             defaultValue={driver_info.credit_card_number}/>
         </label>
         <label>
           License Number:
           <input
             type='text'
             name='license_number'
             placeholder='License Number'
             defaultValue={driver_info.license_number}/>
         </label>
         <label>
           License Plate:
           <input
             type='text'
             name='license_plate'
             placeholder='License Plate'
             defaultValue={driver_info.license_plate}/>
         </label>
         <label>
           Car Info:
           <textarea
           name='car_info'
           placeholder='Describe your vehicle'
           defaultValue={driver_info.car_info}/>
         </label>

         <br/>
          <label>
            Departure City:
            <GeoSuggest
              type='text'
              name='departing_city'
              onSuggestSelect={::this.onSuggestSelectDepart}
              placeholder='Where are you leaving from?'/>
          </label>

          <label>
            Estimate Leave Time:
            <input
              type='time'
              name='time_leave'
              placeholder='What time are you leaving?'/>
          </label>
​
          <label>
            Date:
            <input
              type='date'
              name='date_leave'
              placeholder='When are you leaving?'/>
          </label>
​
          <label>
            Destination:
            <GeoSuggest
              type='text'
              name='destination'
              onSuggestSelect={::this.onSuggestSelectDest}
              placeholder='Where are you driving to?'/>
          </label>
​
​          <label>
            Estimate Time of Arrival:
            <input
              type='time'
              name='time_arrive'
              placeholder='What time will you arrive?'/>
          </label>
​
          <label>
            Date:
            <input
              type='date'
              name='date_arrive'
              placeholder='What date will you arrive?'/>
          </label>
​
          <label>
            Seats Available:
            <input
              type='text'
              name='seats_available'
              placeholder='Number of seats you want to make available'/>
          </label>
​
          <label>
          {/*Here is the suggested price*/}
          <div className="price-machine">{processing ? this.processing() : suggested_price}</div>
          <div className="host-span">
            <i className="fa fa-info-circle" aria-hidden="true"></i>
            <div>(You must have your departure, destination, and seat availability filled out to see suggested price).
              <br/>
              The price listed above is a suggested price calculated by
              the actual miles you're traveling, an average MPG,
              and the daily gas prices in your area.
              <b>The price is a total for all the seats you have made available
              for this trip.</b>  The actual price charged to each rider will vary
              based on how many seats are booked, giving more incentive to riders,
              but don't worry, the total price will be covered no matter how many
              riders join your trip.
              This tool is made available as a guideline, but you may charge
              what you want.</div>
          </div>
            <br/>
            Total Price:
            <input
              type='text'
              name='seat_price'
              placeholder={suggested_price}/>
          </label>
​
​
​
           <label className="trip-description">
            Trip Description:
            <textarea
              type='text'
              name='comments'
              placeholder='get potential riders excited about your trip by giving them a description here'>
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

render(){
  let { loading } = this.state;
  return (
    loading
    ? this.renderLoading()
    : this.renderPage()
  )
}
}
