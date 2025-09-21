import React from 'react'
import {Outlet} from 'react-router-dom'
const Educator = () => {
  return (
    <div>
      <h1>Heading</h1>
      <div><Outlet/></div>
      <h1>Footer</h1>
    </div>

  );
}

export default Educator