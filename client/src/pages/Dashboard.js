import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserDashboard from './UserDashboard';
import FreelancerDashboard from './FreelancerDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  // Route to appropriate dashboard based on user type
  if (user?.isSeller) {
    return <FreelancerDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default Dashboard;