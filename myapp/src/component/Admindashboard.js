import React from "react";
import './Admindashboard.css';
import Header from "./Header";

const Admindashboard =() =>{
return(

    <div>
      <Header />
       <div className='title'>
      <span>Admin Dashboard</span>
    </div>
       <div className="container">
      {/* <div className="hamburger">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div> */}
      <div id="cardcan" className='cardcan'>
      <div className="card">
        <h2>Card 1</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="card">
        <h2>Card 2</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="card">
        <h2>Card 3</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="card">
        <h2>Card 4</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="card">
        <h2>Card 5</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="card">
        <h2>Card 5</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      </div>
    </div> 
    </div>
)

}
export default Admindashboard;