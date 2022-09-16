import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import { LOGOUT } from './actions/types';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import Application from './components/application/Application';
import ApplicationForm from './components/application/ApplicationForm';
import ApplicationItem from './components/application/ApplicationItem';
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import NotFound from './components/layout/NotFound';
import StudentLogin from './components/student/StudentLogin';
import StudentRegister from './components/student/StudentRegister';
import StudentDashboard from './components/studentDashboard/StudentDashboard';

import './CSS/App.css';

import Complaints from './components/complaint/Complaints';
import Fees from './components/fees/Fees';
import Page1 from './components/pages/Page1';
import Page2 from './components/pages/Page2';
import Page3 from './components/pages/Page3';
import StudentDashboardMain from './components/studentDashboard/StudentDashboardMain';

// Redux
import { Provider } from 'react-redux';
import PrivateRouteAdmin from './components/routing/PrivateRouteAdmin';
import PrivateRouteStudent from './components/routing/PrivateRouteStudent';
import store from './store';
import setAuthToken from './utils/setAuthToken';



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
          <Route path='Complaints' element={<Complaints />} />
        </Route>
        <Route path='/adminDashboard' element={
          <PrivateRouteAdmin>
            <AdminDashboard />
          </PrivateRouteAdmin>}
          >
          <Route index element={<StudentDashboardMain/>} />
          <Route path='page1' element={<Page1 />} />
          <Route path='page2' element={<Page2 />} />
          <Route path='page3' element={<Page3 />} />
          <Route path='Complaints' element={<Complaints />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Alert/>
    </Router>
    </Provider>
  )
};

export default App;