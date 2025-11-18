import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import "./js/jquery.min.js";  
import "./js/bootstrap.bundle.min.js";
{/*
import "./js/waypoints.min.js";
import "./js/jquery.easing.min.js";
import "./js/owl.carousel.min.js";
import "./js/jquery.magnific-popup.min.js";
*/}
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

// name  donarname itemname description quantity  landmark address city address pincode mobile 

const PostHostel = () => {

  const [formData, setFormData] = useState({
    //owneremail: '',
    name: '',
    mobile: '',
    address: '',
    city: '',
    facility: '',
    price: '',
    
    
  });
  const [validationErrors, setValidationErrors] = useState({});


  const postHostelData = async () => {
    const token = localStorage.getItem('token');
    const ownerEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)owneremail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
    //console.log(donarEmail);  // Output: donar@gmail.com

    try {
      const response = await fetch('http://localhost:4000/api/v1/hostel/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({
          ...formData,
          owneremail: ownerEmail,
        }),
      });

      if (response.ok) {
        console.log('Hotel data posted successfully!');
        // Handle success, e.g., redirect to another page
        alert('Created Successful');
        window.location.href = "view_hostel_owner";

      } else {
        console.error('Error posting Hotel data:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting Hotel data:', error.message);
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
        // Reset validation error htmlFor the current field when it's being modified
        setValidationErrors({
          ...validationErrors,
          [name]: '',
        });

  };


      // Validation 
        const validateForm = () => {
        let isValid = true;
        const errors = {};
            
        // Check if any field is empty
        for (const key in formData) {
          if (!formData[key]) {
            errors[key] = 'This field is required';
            isValid = false;
          }
        }
        // Validate phone number
        if (!/^\d{10}$/.test(formData.mobile)) {
          errors.mobile = 'Phone must be a 10-digit number';
          isValid = false;
        }
        setValidationErrors(errors);
    
        return isValid;
      };
    

  // OnForm Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Validation failed, do not proceed with the submission
      alert('Fill all the fields');
      return;
    }
    // Else Validation passed 
    postHostelData();
  };




  return (
    <div>
        <div>
      
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
    
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{color:'#020310'}}><img src={imgSmall} alt=""/> <Title /> </div>
        
            <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas"><span></span><span></span><span></span></div>
        </div>
        </div>  

{/* tabindex="-1" */}
        <div className="offcanvas offcanvas-start suha-offcanvas-wrap"  id="suhaOffcanvas" aria-labelledby="suhaOffcanvasLabel">
      <button className="btn-close btn-close-white text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>

      <div className="offcanvas-body">
        <div className="sidenav-profile">
          <div className="user-profile"><img src={imgBg} alt=""/></div>
          <div className="user-info">
            <h6 className="user-name mb-1">Hotel Booking Management System</h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/owner_home"><i className="lni lni-home"></i>Home</Link></li>
          <li><Logout /></li>  
          </ul>
      </div>
    </div>
      </div>
    </div>
    <div className="page-content-wrapper">
      <div className="top-products-area py-3">
        <div className="container">
          <div className="section-heading d-flex align-items-center justify-content-between">
            <h5 style={{color:'#203354'}}>Add Hotel Details</h5>
          </div>
        {/* Form Scrip Start*/}
        <div className="profile-wrapper-area py-1">
          <div className="card user-data-card">
            <div className="card-body">
              <form  onSubmit={handleSubmit}>
              
              <div className="mb-3">
                  <div className="title mb-2"><span>Name:</span></div>
                  <input className="form-control"
                    name="name" id="name"
                    value={formData.name}
                    onChange={handleInputChange}    type="text"  placeholder='Name'/>
                </div>
                <div className="mb-3">
                  <div className="title mb-2"><span>Mobile:</span></div>
                  <input className="form-control" name="mobile" id="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}   type="number" placeholder='Mobile number'/>
                </div>
	  			 <div className="mb-3">
                    <div className="title mb-2"><span>Address:</span></div>
                  <input className="form-control" name="address" id="address"
                    value={formData.address}
                    onChange={handleInputChange}   type="text" placeholder='Address'/>
                </div>
	    			 <div className="mb-3">
                  <div className="title mb-2"><span>City:</span></div>
                  <input className="form-control" name="city" id="city"
                    value={formData.city}
                    onChange={handleInputChange}   type="text" placeholder='City'/>
                </div>
                <div className="mb-3">
  <div className="title mb-2"><span>Facilities:</span></div>
  <textarea 
    className="form-control" 
    name="facility" 
    id="facility"
    value={formData.facility}
    onChange={handleInputChange} 
    placeholder='Available Facilities'
  />
</div>

                <div className="mb-3">
  <div className="title mb-2"><span>Price:</span></div>
  <textarea className="form-control" name="price" id="price"
    value={formData.price}
    onChange={handleInputChange} placeholder='Price Ranges' />
</div>

					 
                {/* Validation for Mobile 10 Digits*/}
                {validationErrors.mobile && <p style={{ color: 'red' }}>{validationErrors.mobile}</p>}
      

        
                <button className="btn btn-success w-100"  type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
        {/* Form Scrip End*/}



        </div>
      </div>
    </div>
            
            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/owner_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                    
                
                  </ul>
                </div>
              </div>
            </div>


</div>
</div>
  )
}

export default PostHostel