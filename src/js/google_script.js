import React from 'react';
import token from './token';

const URL = `https://maps.googleapis.com/maps/api/js?key=${token}&callback=initMap`;

export default <script
                  async defer src={URL}
                  type='text/javascript'>
               </script>
