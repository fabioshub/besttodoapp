import React, { Component } from 'react';
import './navbar.css';
import { Link, Redirect } from 'react-router-dom'



class Navbar extends Component {

  removeUser = () => {
    localStorage.removeItem('login')
    this.forceUpdate()
  }


  render() {

    if (!localStorage.getItem('login') || !localStorage.getItem('login') == true) {
      return(
        <Redirect to='/login' />
      )
    } else {
    return(
        <nav className="navbar fixed-bottom " style={{display: "flex",justifyContent: "space-around" }}>
        <Link to={"/notes"} ><i class="fa fa-list" aria-hidden="true"></i></Link>
          <i style={{color: "hsl(0, 100%, 73%)", fontSize: "20px"}} class="fas fa-sign-out-alt    loguit"onClick={this.removeUser}></i>
        </nav>
    ) 
    }
  }
}

export default Navbar;
