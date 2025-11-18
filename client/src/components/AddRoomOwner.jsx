import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
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

const AddRoomOwner = () => {
  const { id } = useParams();
  const [editedRoom, setEditedRoom] = useState({
    owneremail: '',
    name: '',
    type: '',
    price: '',
    vacancy: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/hostel/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEditedRoom({
            name: data.name,
            
          });
        } else {
          console.error('Error fetching Slot data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching Slot data:', error.message);
      }
    };

    fetchRoomDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRoom({
      ...editedRoom,
      [name]: value,
    });
  };

  const handleUpdateRoom = async (e) => {
    const token = localStorage.getItem('token');
    const ownerEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)owneremail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:4000/api/v1/room/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify({
                ...editedRoom,
                owneremail: ownerEmail, 
                
            }),
        });
      if (response.ok) {
        console.log('Room details updated successfully!');
        alert('Room details updated successfully!')
        window.location.href = "/manage_room_owner";
      } else {
        console.error('Failed to update room status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating room status:', error.message);
    }
    document.cookie = `name=${editedRoom.name}; path=/`;
  };




  return (
    <div>
      <div>
        {/* Header Area */}
        <div className="header-area" id="headerArea">
          <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{ color: '#020310' }}><img src={imgSmall} alt="" /> <Title /> </div>
            <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas"><span></span><span></span><span></span></div>
          </div>
        </div>
        {/* Offcanvas Area */}
        <div className="offcanvas offcanvas-start suha-offcanvas-wrap" id="suhaOffcanvas" aria-labelledby="suhaOffcanvasLabel">
          <button className="btn-close btn-close-white text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          <div className="offcanvas-body">
            <div className="sidenav-profile">
              <div className="user-profile"><img src={imgBg} alt="" /></div>
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
      {/* Page Content Wrapper */}
      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>Update Room Status</h6>
            </div>
            <div className="profile-wrapper-area py-3">
              <div className="card user-data-card">
                <div className="card-body">
                  <form onSubmit={handleUpdateRoom}>


                    
                    <div className="mb-3">
                      <div className="title mb-2"><span>Hotel Name:</span></div>
                      <input
                        className="form-control"
                        name="name"
                        id="name"
                        value={editedRoom.name}
                        onChange={handleInputChange}
                        type="text" readOnly/>
                    </div>
                   
                    <div className="mb-3">
                      <div className="title mb-2"><span>Room Type:</span></div>
                      <input
                        className="form-control"
                        name="type"
                        id="type"
                        value={editedRoom.type}
                        onChange={handleInputChange}
                        type="text" placeholder='(e.g) Economy Single Room'/>
                    </div>

                    <div className="mb-3">
                      <div className="title mb-2"><span>Room Price:</span></div>
                      <input
                        className="form-control"
                        name="price"
                        id="price"
                        value={editedRoom.price}
                        onChange={handleInputChange}
                        type="number" />
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2"><span>No. of Vacancy:</span></div>
                      <input
                        className="form-control"
                        name="vacancy"
                        id="vacancy"
                        value={editedRoom.vacancy}
                        onChange={handleInputChange}
                        type="number" />
                    </div>

                    <button className="btn btn-success w-100" type="submit">Save</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Nav Area */}
      <div className="footer-nav-area" id="footerNav">
        <div className="container h-100 px-0">
          <div className="suha-footer-nav h-100">
            <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
              <li className="active"> <Link to="/owner_home"><i className="lni lni-home"></i>Home </Link> </li>
              <li><Logout /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRoomOwner;
