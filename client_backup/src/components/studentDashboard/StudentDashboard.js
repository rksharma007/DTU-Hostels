import propTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';


const sidebarNavItems = [
  {
    display: 'Dashboard',
    icon: <i className='fas fa-star'></i>,
    to: '',
    section: 'main'
  },
  {
      display: 'Hostel Application',
      icon: <i className='fas fa-sticky-note'></i>,
      to: 'application',
      section: 'application'
  },
  {
      display: 'Incomplete',
      icon: <i className='fas fa-calendar'></i>,
      to: 'page2',
      section: 'page2'
  },
  {
      display: 'Fees',
      icon: <i className='fa fa-rupee'></i>,
      to: 'fees',
      section: 'fees'
  },
  {
      display: 'Complaints',
      icon: <i className='fas fa-receipt'></i>,
      to: 'complaints',
      section: 'complaints'
  },
  
]

const Sidebar = ()  => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sidebarRef = useRef();
  const location = useLocation();

  // change active index
  useEffect(() => {
      const curPath = window.location.pathname.split('/')[2] ? window.location.pathname.split('/')[2] : 'main';
      const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
      setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return <div className='sidebar'>
      <div className="sidebar__logo">
      </div>
      <div ref={sidebarRef} className="sidebar__menu">{
        sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index}>
            <div className={`${activeIndex === index ? 'sidebar__menu__item__active' : 'sidebar__menu__item'}`}>
              <div className="sidebar__menu__item__icon">
                {item.icon}
              </div>
              <div className="sidebar__menu__item__text">
                {item.display}
              </div>
            </div>
          </Link>
        ))
      }
      </div>
      <div className='sidebar__footer'>
      </div>
  </div>
};

const StudentDashboard = () => {
  return (
    <section>
      <Sidebar />
      <div className='container container-dashboard'>
        <Outlet />
      </div>
    </section>
  )
}

StudentDashboard.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(StudentDashboard);