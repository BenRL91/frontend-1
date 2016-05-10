import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax } from 'jquery';
import SSF from 'react-simple-serial-form';
import GeoSuggest from 'react-geosuggest';
import cookie from 'js-cookie';

export default class EditTrip extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      current_trip: {},
      current_user: null,
      loading: true
    }

  }


  componentWillMount(){
    let id = this.props.params.trip_id;
    let current_user = cookie.getJSON('current_user')
    ? cookie.getJSON('current_user').current_user
    : null
    this.setState({current_user})
    ajax(`https://salty-river-31528.herokuapp.com/hosts/${id}`)
    .then(resp => {
      this.setState({
        current_trip: resp.hosts,
        loading: false
      })
     }
    )
  }


	edit(trip_details){
    let id = this.props.params.trip_id;

    ajax({
      url: `https://salty-river-31528.herokuapp.com/hosts/${id}`,
      type: 'PUT',
      data: trip_details
    }).then( resp => {
      console.log(resp)
      // cookie.set('current_trip', {current_trip: resp.trip)
      hashHistory.push(`/tripdetails/${id}`)
    })
  }


  deleteHandler(){

    let id = this.props.params.trip_id;
    let { current_user } = this.state;
    ajax({
      url: `https://salty-river-31528.herokuapp.com/hosts/${id}`,
      type: 'DELETE'
    }).then( resp => {
      console.log(resp)
      // cookie.set('current_trip', {current_trip: resp.trip)
      hashHistory.push(`/profile/${current_user.id}`)
    })
  }


renderLoading(){
  return (
    <div>Loading...</div>
    )
}


renderPage(){
  let trip = this.state.current_trip;
    let user = this.state.current_user;



    return (
      <div className="trip-details-wrapper">


      <div className="trip-details">

        <SSF className='edit-trip-form' onData={::this.edit}>

        <label>
         departure:
          <GeoSuggest
            type='text'
            name='departing_city'
            defaultValue={trip.departing_city}/>
        </label>

        <label>
         date leaving:
          <input
            type='date'
            name='date_leave'
            defaultValue={trip.date_leave}/>
        </label>

        <label>
         destination:
            <GeoSuggest
            type='text'
            name='destination'
            defaultValue={trip.destination}/>
        </label>

        <label>
         date arriving:
          <input
            type='date'
            name='date_arrive'
            defaultValue={trip.date_arrive}/>
        </label>

        <label>
          trip duration{/*need to estimate*/}
        </label>

        <label>
         price:
          <input
            type='text'
            name='seat_price'
            defaultValue= {trip.seat_price}/>
        </label>

        <label>
         seats available:
          <input
            type='text'
            name='seats_available'
            defaultValue= {trip.seats_available}/>
        </label>

        <label>
         description of trip:
          <input
            type='text'
            name='comments'
            defaultValue= {trip.comments}/>
        </label>


          <button className="edit-trip-submit"> submit changes </button>



       </SSF>

          <button onClick={::this.deleteHandler} className="edit-trip-delete">DELETE this trip</button>

      </div>



     </div>



    )
  }
  render(){
    let {loading} = this.state;
    return (loading
    ? this.renderLoading()
    : this.renderPage()
    )

}
}
