import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from 'components/template/MainHeader/MainHeader';
import MainSidebar from 'components/template/MainSidebar/MainSidebar';
import MainOverlay from 'components/template/MainOverlay/MainOverlay';

import './DashboardLayout.scss';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <MainHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <MainSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && <MainOverlay onClick={() => setSidebarOpen(false)} />}
      <main className="layout__main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
