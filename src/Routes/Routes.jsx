import React from 'react';
import { createBrowserRouter } from "react-router";
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import AddHabit from '../Pages/AddHabit';
import HabitDetails from '../Pages/HabitDetails';
import MyHabit from '../Pages/MyHabit';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import PrivateRoute from './PrivateRoute';
import PublicHabit from '../Pages/PublicHabit';
import Profile from '../Pages/Profile';
import NotFound from '../Pages/NotFound';


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
        path:'/my-habits',
        element:<PrivateRoute>
            <MyHabit/>
        </PrivateRoute> ,
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
        path: "*",
        Component: NotFound,
      }
    ]
  },
]);


export default router;