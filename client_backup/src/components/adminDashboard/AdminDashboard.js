import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router';
import { Link, useLocation } from 'react-router-dom';

const sidebarNavItems = [
  {
    display: 'Main',
    icon: <i className='fa fa-star'></i>,
    to: '',
    section: 'main'
  },
  {
      display: 'Student Login',
      icon: <i className='fa fa-star'></i>,
      to: 'page1',
      section: 'page1'
  },
  {
      display: 'Admin Login',
      icon: <i className='fa fa-calendar'></i>,
      to: 'page2',
      section: 'page2'
  },
  {
      display: 'Student Register',
      icon: <i className='fa fa-user'></i>,
      to: 'page3',
      section: 'page3'
  },
  {
      display: 'Complaints',
      icon: <i className='fa fa-receipt'></i>,
      to: 'page4',
      section: 'page4'
  },
]

const Sidebar = () => {
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
      <div ref={sidebarRef} className="sidebar__menu">
          {
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
  </div>
};

const AdminDashboard = () => {
  return (
    <section>
      <Sidebar />
      <div className='container container-dashboard'>
        <Outlet />
      </div>
    </section>
  )
}

export default AdminDashboard;