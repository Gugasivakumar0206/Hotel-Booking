import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
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

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewHostelOwner = () => {


  ////////////////////////////////////////////////
  //////////////Navgation Code Start//////////////
  ////////////////////////////////////////////////
  
  const [hostelId, setHostelId] = useState(''); // Set the initial value accordingly
  // Function to get user location and update on the server
  const getUserLocation = async () => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          console.log(`ID: ${hostelId}`);
          updateLocationOnServer(latitude, longitude);
        },
        (error) => {
          console.error(`Error getting user location: ${error.message}`);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
   // Update location on the server
   async function updateLocationOnServer(latitude, longitude) {
  //  const hostelId = "6576e6dcfa3350243c6af5b3"; // Replace with the actual hostel ID
    const url = `http://localhost:4000/api/v1/hostel/map/` + hostelId;
  
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers, such as authentication token if needed
        },
        body: JSON.stringify({
          lat: latitude,
          long: longitude,
        }),
      });
  
      if (response.ok) {
        alert("Location updated successfully!");
        console.log("Location updated successfully!");
        window.location.reload();
      } else {
        console.error(`Error updating location: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error updating location: ${error.message}`);
    }
  }
  // Trigger getUserLocation when hostelId changes
  useEffect(() => {
    if (hostelId) {
      getUserLocation();
    }
  }, [hostelId]);

  ////////////////////////////////////////////////
  //////////////Navgation Code End ///////////////
  ////////////////////////////////////////////////

  ////////////////////////////////////////////////
  //////////////Update Delete Code ///////////////
  ////////////////////////////////////////////////

  const navigate = useNavigate();

  const Removefunction = (id) => {
    if (window.confirm('Do you want to remove?')) {
      const token = localStorage.getItem('token');

        fetch("http://localhost:4000/api/v1/hostel/" + id, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
        }).then((res) => {
          //  alert('Removed successfully.')
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }
}
const LoadPhoto = (id) => {
  navigate("/Upload_Image/" + id);
}
const LoadRoom = (id) => {
  navigate("/add_room_owner/" + id);
}


const LoadEdit = (id) => {
  navigate("/update_hostel/" + id);
}

const UpdateLocation = (id) => {
  navigate("/geolocation/" + id);
}
  
  const [hostelData, setHostelData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostelData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/hostel/');
        const data = await response.json();

        // Assuming 'donaremail' is the key in cookies
        const owneremail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)owneremail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
         // Filter Hotel data based on donaremail
         const filteredHostel = data.filter((hostel) => hostel.owneremail === owneremail);
         setHostelData(filteredHostel);
         setFilteredData(filteredHostel);
         //console.log(filteredHostel);
         setLoading(false);
      } catch (error) {
        console.error('Error fetching Hotel data:', error.message);
        setLoading(false);
      }
    };

    fetchHostelData();
  }, []);



  // Filter data based on the search term
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = hostelData.filter((hostel) =>
      Object.values(hostel).some((field) =>
        field.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  const timeOptions = { hour: '2-digit', minute: '2-digit' };


  
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
            <h6>View My Hotel Details</h6>
			
          </div>
          <div className="row g-3" >
              <div className="top-search-form">
                <form>
                  <input className="form-control"  type="text"  placeholder="Search..."     value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}  />
                  <button type="submit"><i className="fa fa-search"></i></button>
                </form>
              </div>
            </div>

            {/* Show if Null data in table */}

            {filteredData.length > 0 ? (
            <div className="row" style={{marginTop:10}}>
            {/* Get Details Map field and id */}          
                {filteredData.map((hostel) => (
              <div key={hostel._id} className="col-12 col-md-20">                                        
              <div className="card product-card" style={{marginBottom:10}}>
                <div className="card-body"    >
                      <a className="product-title d-block"  >E-Mail : <b>{hostel.owneremail}</b></a>
                      <a className="product-title d-block"  >Name : <b>{hostel.name}</b></a>
                      <a className="product-title d-block"  >Mobile : <b>{hostel.mobile}</b></a>
                      <a className="product-title d-block"  >Address : {hostel.address}</a>
                      <a className="product-title d-block"  >City : {hostel.city}</a>	
                      <a className="product-title d-block"  >Facility : {hostel.facility}</a>
                      <a className="product-title d-block"  >Price ranges : {hostel.price}</a>
                      <a className="product-title d-block"  >Mobile : {hostel.mobile}</a>
                      
                      <a className="product-title d-block"  >Lat : {hostel.lat}  </a>
                      <a className="product-title d-block"  >Long : {hostel.long}  </a>
                      <a className="product-title d-block">Date : {new Date(hostel.dateCreated).toLocaleDateString('en-GB',timeOptions)}  </a>
                      <a className="product-title d-block" >Status : <b style={{ animation: 'blinkingText 1s infinite', color:"indigo" }}> {hostel.status}</b>
                      </a>
                      <td>
  {/* Display the hostel image */}
  {hostel.image && (
    <a href={`http://localhost:4000/${hostel.image}`} target="_blank" rel="noopener noreferrer" className="product-title d-block">

      <img src={`http://localhost:4000/${hostel.image}`} alt="hostel Image" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} />
    </a>
  )}
</td><br></br>


                    </div>
                  </div>   
                  <a className="btn btn-danger" onClick={() => { LoadPhoto(hostel.id) }}>Upload Photo</a>
                  <a className="btn btn-danger" onClick={() => { LoadEdit(hostel.id) }}>Update</a>
                  <a className="btn btn-danger" onClick={() => { Removefunction(hostel.id) }}>Delete</a>
                 <a className="btn btn-danger" onClick={() => setHostelId(hostel.id)}>Geo Map</a> 

                 <a className="btn btn-danger" target="_blank"
                  href={`https://maps.google.com/?q=${hostel.lat},${hostel.long}`}>
                  Show Map
                </a>
                <a className="btn btn-danger" onClick={() => { LoadRoom(hostel.id) }}>Room</a>
              </div>
              ))}

              
        </div>
                  ) : (
                    <p>No hostel details found for the specified owner email or search term.</p>
            )}

           {/* Show if Null data in table */}

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
</div>
  )
}

export default ViewHostelOwner