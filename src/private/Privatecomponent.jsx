import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

export const PrivateComponent = () => {
  const accessToken = localStorage.getItem('accessToken');
  const userState = useSelector((state) => state.authenticate.userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/signup');
    }
  }, [userState, accessToken, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};
export default PrivateComponent
