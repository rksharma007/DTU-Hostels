import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { LOGOUT } from './actions/types';
import './CSS/App.css';

// Redux
import { Provider } from 'react-redux';
import PrivateRouteAdmin from './components/routing/PrivateRouteAdmin';
import PrivateRouteStudent from './components/routing/PrivateRouteStudent';
import store from './store';
import setAuthToken from './utils/setAuthToken';

// Layout
import Fees from './components/fees/Fees';
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import NotFound from './components/layout/NotFound';
import Page2 from './components/pages/Page2';


// Students
import AdminStudentsMain from './components/student/AdminStudentsMain';
import AllStudents from './components/student/AllStudents';
import Hostellers from './components/student/Hostellers';
import SearchStudent from './components/student/SearchStudent';
import StudentLogin from './components/student/StudentLogin';
import StudentRegister from './components/student/StudentRegister';

// Admin
import AdminLogin from './components/admin/AdminLogin';


// Dashboard
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import AdminDashboardMain from './components/adminDashboard/AdminDashboardMain';
import StudentDashboard from './components/studentDashboard/StudentDashboard';
import StudentDashboardMain from './components/studentDashboard/StudentDashboardMain';


// Complaints
import AdminComplaintsMain from './components/complaint/AdminComplaintsMain';
import AllComplaints from './components/complaint/AllComplaints';
import Complaints from './components/complaint/Complaints';
import PendingComplaints from './components/complaint/PendingComplaints';
import ResolvedComplaints from './components/complaint/ResolvedComplaints';


// Applications
import AdminApplicationsMain from './components/application/AdminApplicationsMain';
import AllApplications from './components/application/AllApplications';
import AllotRoom from './components/application/AllotRoom';
import AllottedApplications from './components/application/AllottedApplications';
import Application from './components/application/Application';
import ApplicationForm from './components/application/ApplicationForm';
import ApplicationItem from './components/application/ApplicationItem';
import AppliedApplications from './components/application/AppliedApplications';
import ApprovedApplications from './components/application/ApprovedApplications';
import RejectedApplications from './components/application/RejectedApplications';
import SearchApplication from './components/application/SearchApplication';
import VerifiedApplications from './components/application/VerifiedApplications';


// Hostels
import AddHostel from './components/hostels/AddHostel';
import AllHostels from './components/hostels/AllHostels';
import HostelsMain from './components/hostels/HostelsMain';


// Rooms
import AddRoom from './components/rooms/AddRoom';
import AllRooms from './components/rooms/AllRooms';
import RoomsMain from './components/rooms/RoomsMain';
import SearchRoomByHostel from './components/rooms/SearchRoomByHostel';
import VacantRooms from './components/rooms/VacantRooms';


// Notices
import AddNotice from './components/notices/AddNotice';
import AdminNoticeMain from './components/notices/AdminNoticeMain';
import AllNotices from './components/notices/AllNotices';
import Notices from './components/notices/Notices';


const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  },[]);

  return(
  <Provider store={store}>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/notices' element={<Notices />} />
        <Route path='/studentLogin' element={<StudentLogin />} />
        <Route path='/studentRegister' element={<StudentRegister />} />
        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route path='/studentDashboard' element={
              <PrivateRouteStudent>
                <StudentDashboard />
              </PrivateRouteStudent>
            }>
          <Route index element={<StudentDashboardMain />} />
            <Route path='application' element={<Application />}>
              <Route path='status' element={<ApplicationItem />} />
              <Route path='apply' element={<ApplicationForm />} />
            </Route>
            <Route path='page2' element={<Page2 />} />
            <Route path='fees' element={<Fees />} />
            <Route path='complaints' element={<Complaints />} />
        </Route>
        
        <Route path='/adminDashboard' element={
          <PrivateRouteAdmin>
            <AdminDashboard />
          </PrivateRouteAdmin>}
          >
          <Route index element={<AdminDashboardMain/>} />

          <Route path='students' element={<AdminStudentsMain />} >
            <Route index element={<AllStudents/>} />
            <Route path='all' element={<AllStudents />} />
            <Route path='hostellers' element={<Hostellers />} />
            <Route path='search' element={<SearchStudent />} />
          </Route>

          <Route path='complaints' element={<AdminComplaintsMain />} >
            <Route index element={<AllComplaints/>} />
            <Route path='all' element={<AllComplaints />} />
            <Route path='pending' element={<PendingComplaints />} />
            <Route path='resolved' element={<ResolvedComplaints />} />
          </Route>

          <Route path='application' element={<AdminApplicationsMain />} >
            <Route index element={<AllApplications/>} />
            <Route path='all' element={<AllApplications />} />
            <Route path='applied' element={<AppliedApplications />} />
            <Route path='rejected' element={<RejectedApplications />} />
            <Route path='approved' element={<ApprovedApplications />} />
            <Route path='verified' element={<VerifiedApplications />} />
            <Route path='allotted' element={<AllottedApplications />} />
            <Route path='search' element={<SearchApplication />} />
            <Route path='allot' element={<AllotRoom />} />
          </Route>

          <Route path='hostel' element={<HostelsMain/>}>
            <Route index element={<AllHostels />} />
            <Route path='all' element={<AllHostels />} />
            <Route path='add' element={<AddHostel />} />
          </Route>

          <Route path='room' element={<RoomsMain/>}>
            <Route index element={<AllRooms />} />
            <Route path='all' element={<AllRooms />} />
            <Route path='vacant' element={<VacantRooms />} />
            <Route path='add' element={<AddRoom />} />
            <Route path='search' element={<SearchRoomByHostel />} />
          </Route>

          <Route path='notices' element={<AdminNoticeMain />}>
            <Route index element={<AllNotices />} />
            <Route path='add' element={<AddNotice />} />
          </Route>

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Alert/>
    </Router>
    </Provider>
  )
};

export default App;