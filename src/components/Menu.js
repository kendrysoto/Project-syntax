import React from 'react';
import '../style/SideMenu.css';
import { Link } from "react-router-dom";


const Menu =()=> {
  return (
    <div>
      <div className="SideMenu-container">
        <h1 className="SideMenu-h1">Employee List</h1>
      </div >
      <nav>
        <div id="menuA">
          <div href="#" className="showhim"><span className="menumov"> &#8803;</span>
            <div className="showme">
              <li><Link to="/" >HOME</Link></li>
              <li><Link to="/Table" >TABLE</Link></li>
            </div>
          </div>
        </div>

        <ul className="elivi">
          <li className="fac"><Link to="/" >HOME</Link></li>
          <li className="fac"><Link to="/Table" >TABLE</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Menu;
