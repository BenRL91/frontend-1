import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax, ajaxSetup } from 'jquery';



export default class HostSingleView extends Component {


  render(){

    return (


    	<div className="host_single_view_wrapper">

    		<span>SINGLE TRIP VIEW FOR Host
    		EVENTUALLY ENABLE HOST TO EDIT TRIP HERE</span>
        {/*This will be trip_details with editing features if you are the creator of the trip*/}
    		<span> Trip:  </span> <button> edit </button>



    		<button> delete trip </button>


    	</div>

    	)
	}
}
