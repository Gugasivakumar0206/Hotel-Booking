import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
//import "./App.css";

import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "./components/login";
import AdminLogin from "./components/AdminLogin";
import UserRegister from  "./components/UserRegister";
import UserHome from  "./components/UserHome";
import UserProfile from './components/UserProfile';
import EditUserProfile from './components/EditUserProfile';
import Index from './components/Index';
import PostFeedback from './components/PostFeedback';
import ViewMyFeedback from './components/ViewMyFeedback';
import AdminHome from './components/AdminHome';
import UpdateStatusAdmin from './components/UpdateStatusAdmin';
import ViewUserAdmin from './components/ViewUserAdmin';
import ResetPassword from './components/ResetPassword';
import UploadImage from './components/UploadImage';
import OwnerRegister from './components/OwnerRegister';
import OwnerLogin from './components/OwnerLogin';
import ResetPasswordOwner from './components/ResetPasswordOwner';
import OwnerHome from './components/OwnerHome';
import ViewBookingOwner from './components/ViewBookingOwner';
import ViewOwnerAdmin from './components/ViewOwnerAdmin';
import OwnerProfile from './components/OwnerProfile';
import EditOwnerProfile from './components/EditOwnerProfile';
import BookingUser from './components/BookingUser';
import PostBookingUser from './components/PostBookingUser';
import ViewBookingUser from './components/ViewBookingUser';
import PostHostel from './components/PostHostel';
import ViewHostelOwner from './components/ViewHostelOwner';
import UpdateHostel from './components/UpdateHostel';
import AddRoomOwner from './components/AddRoomOwner';
import ManageRoomOwner from './components/ManageRoomOwner';
import UpdateRoomOwner from './components/UpdateRoomOwner';
import ViewHostelAdmin from './components/ViewHostelAdmin';
import SearchHostelUser from './components/SearchHostelUser';
import UploadImageRoom from './components/UploadImageRoom';


function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
      
            <Route path='/' element={<Index />} />
            <Route path='/user_login' element={<Login />} />
            <Route path='/owner_register' element={<OwnerRegister />} />
            <Route path='/admin_login' element={<AdminLogin />} />
            <Route path='/admin_home' element={<AdminHome />} />
            <Route path='/view_user_admin' element={<ViewUserAdmin />} />
            <Route path='/update_status_admin/:id' element={<UpdateStatusAdmin />} />
            <Route path='/owner_login' element={<OwnerLogin />} />
            <Route path='/owner_home' element={<OwnerHome />} />
            <Route path='/user_profile' element={<UserProfile />} />
            <Route path='/edit_profile/:id' element={<EditUserProfile />} />  
            <Route path='/post_feedback/:id' element={<PostFeedback />} />
            <Route path='/view_my_feedback' element={<ViewMyFeedback />} />
            <Route path='/user_home' element={<UserHome />} />      
            <Route path='/user_register' element={<UserRegister />} /> 
            <Route path='/view_owner_admin' element={<ViewOwnerAdmin />} />
            <Route path='/view_booking_owner' element={<ViewBookingOwner />} />
            <Route path='/edit_owner_profile/:id' element={<EditOwnerProfile />} />
            <Route path='/reset_password' element={<ResetPassword />} />
            <Route path='/reset_password_owner' element={<ResetPasswordOwner />} />
            <Route path='/upload_image/:id' element={<UploadImage />} />
            <Route path='/owner_profile' element={<OwnerProfile />} />
            <Route path='/booking_user/' element={<BookingUser />} />
            <Route path='/post_booking_user' element={<PostBookingUser />} />
            <Route path='/view_booking_user' element={<ViewBookingUser />} />
            <Route path='/post_hostel' element={<PostHostel />} />
            <Route path='/view_hostel_owner' element={<ViewHostelOwner />} />
            <Route path='/update_hostel/:id' element={<UpdateHostel />} />
            <Route path='/add_room_owner/:id' element={<AddRoomOwner />} />
            <Route path='/manage_room_owner' element={<ManageRoomOwner />} />
            <Route path='/update_room_owner/:id' element={<UpdateRoomOwner />} />
            <Route path='/view_hostel_admin' element={<ViewHostelAdmin />} />
            <Route path='/search_hostel_user' element={<SearchHostelUser />} />
            <Route path='/upload_image_room/:id' element={<UploadImageRoom />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
}



export default App;

{/*
unused 
import Viewlist from "./assets/unused/Viewlist";
import Edit from "./assets/unused/Edit";
import CreateBusiness from "./assets/unused/CreateBusiness";
import ViewAxios from "./assets/unused/ViewAxios";

<Route path='/viewtest' element={<Viewlist />} />            
<Route path='/axios' element={<ViewAxios />} />
<Route path='/create' element={<CreateBusiness />} />          
<Route path='/edit/:id' element={<Edit />} />

*/}