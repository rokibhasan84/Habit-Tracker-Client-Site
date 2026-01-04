import React from 'react';
import { createBrowserRouter } from "react-router";
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import AddHabit from '../Pages/AddHabit';
import HabitDetails from '../Pages/HabitDetails';
import MyHabit from '../Pages/Dashboard/MyHabit';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import PrivateRoute from './PrivateRoute';
import PublicHabit from '../Pages/PublicHabit';
import Profile from '../Pages/Profile';
import NotFound from '../Pages/NotFound';
import ForgetPassword from '../Pages/ForgetPassword';
import ChangePassword from '../Pages/ChangePassword';
import DashboardLayout from '../Layouts/DashboardLayout';
import DashboardHome from '../Pages/Dashboard/DashboardHome';
import Analytics from '../Pages/Dashboard/Analytics';
import AdminUsers from '../Pages/Dashboard/AdminUsers';
import AdminHabits from '../Pages/Dashboard/AdminHabits';
import About from '../Component/About';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/add-habit',
        element: 
        <PrivateRoute>
                <AddHabit/>
            </PrivateRoute>
        ,
      },
      {
        path: '/habit/:id',
        element: <PrivateRoute>
          <HabitDetails></HabitDetails>
        </PrivateRoute> 
      },
      {
        path: '/public-habits',
        Component: PublicHabit,
      },
      {
        path:'/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/profile',
        element: <PrivateRoute> 
          <Profile></Profile>
          </PrivateRoute>
      },
      {
        path: '/about',
        element: <About></About>,
      },
      {
        path: "*",
        Component: NotFound,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword></ForgetPassword>
      },
      {
        path: '/change-password',
        element: <PrivateRoute>
          <ChangePassword></ChangePassword>
          </PrivateRoute>
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
          {
            index: true, element: <DashboardHome></DashboardHome>
          },
          {
            path: "admin-users",
            element: <AdminUsers></AdminUsers>
          },
          {
            path: "admin-habits",
            element: <AdminHabits></AdminHabits>
          },
          {
            path: "my-habits",
            element: <MyHabit></MyHabit>
          },
        ],
      },
    ],
  },
]);


export default router;