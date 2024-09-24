import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './admin/Companies'
import CreateCompany from './admin/CreateCompany'
import CompanySetUp from './admin/CompanySetUp'
import AdminJobs from './admin/AdminJobs'
import CreateJobPost from './admin/CreateJobPost'
import Applicants from './admin/Applicants'
import ProtectedRoute from './admin/ProtectedRoute'

function App() {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/jobs',
      element: <Jobs />
    },
    {
      path: '/description/:id',
      element: <JobDescription />
    },
    {
      path: '/browse',
      element: <Browse />
    },
    {
      path: '/profile',
      element: <Profile />
    },
    //admin component start
    {
      path: '/admin/companies',
      element:<ProtectedRoute><Companies/></ProtectedRoute>
    },
    {
      path: '/admin/companies/create',
      element:<ProtectedRoute><CreateCompany/></ProtectedRoute>
    },
    {
      path: '/admin/companies/:id',
      element:<ProtectedRoute><CompanySetUp/></ProtectedRoute>
    },
    {
      path: '/admin/jobs',
      element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
    },
    {
      path: '/admin/jobs/create',
      element:<ProtectedRoute><CreateJobPost/></ProtectedRoute>
    },
    {
      path: '/admin/jobs/:id/applicants',
      element:<ProtectedRoute><Applicants/></ProtectedRoute>
    }
  ])
  return (
    <>
    <div>
    <RouterProvider router={appRouter} />
    </div>
    </>
  )
}

export default App
