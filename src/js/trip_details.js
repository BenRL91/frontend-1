import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

export default class TripDetails extends Component {
  render(){
    return (
      <div className="trip-details-wrapper">


      	<div className="trip-details">
  				

  			 <div className="trip-details-cities">
  				Atlanta{/*from*/} to {/*to*/} Miami
     		 </div>

     		 <div className="trip-details-dates">
  				11/11/17{/*from*/} to 11/14/17 {/*to*/}
     		 </div>

     		 <div className="trip-details-duration">
  				18 hrs{/*days/hrs*/}
     	 	</div>

     	 	<div className="trip-details-price">
  				$100 {/*money*/}
     		 </div>

     		 <div className="trip-details-seats">
  				3/4 seats available{/*seats available*/}
     	 	</div>

     	 	<div className="trip-details-cities">
  				<button> expand details </button>
     		</div>

     	</div>



     	 	<div className="trip-details-driver">
     	 		<span>John</span>
     	 		<span>Verified Driver</span> 
     	 		<button> expand details </button>			
     	 	</div>


     </div>
    )
  }
}
