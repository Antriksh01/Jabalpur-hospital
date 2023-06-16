import React from 'react'
import './Addadoctor.css';
import Header from './Header';

const Addadocter=()=>{

    return(
    <>
    <Header/>

 <div  className="signup-container">
 <span><h1>Add a Docter</h1></span>
      <form>
        <label ></label>
        <input type="text" placeholder='Docter Name'/>
        <label ></label>
        <input type="text" placeholder='Mobile No'/>
        <label ></label>
        <input type="text" placeholder='Department Name'/>
        <label ></label>
         <input type="text" placeholder='Availability Time'/>
         <label ></label>
        <input type="text" placeholder='Off Day'/>
         <label></label>
        <input type="text" placeholder='Additional Notes'/>
    
      </form>  
    </div>
  <div className='submit'>
  <button1  type="submit">Register a Doctor </button1> 
  </div>



</>

);
}
export default Addadocter;