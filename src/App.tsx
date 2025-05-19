import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Home from './pages/Home/Home';
import LoginPage from './pages/Authentication/Login';
import UserTypeSelectionPage from './pages/Authentication/UserTypeSelectionPage';
import CitizenSignUp from './pages/Authentication/CitizenSignUp';
import OfficerSignUp from './pages/Authentication/OfficerSignUp';

// Admin Dashboard Imports
import AdminLayout from './layout/AdminLayout';
import AdminHome from './pages/AdminDashboard/AdminHome';
import DashboardHome from './pages/AdminDashboard/DashboardHome';
import Complaints from './pages/AdminDashboard/Complaints';
import ComplaintDetailPage from './pages/AdminDashboard/ComplaintDetailPage';
import Agents from './pages/AdminDashboard/Agents';
import AgentDetailPage from './pages/AdminDashboard/AgentDetailPage';
import Cities from './pages/AdminDashboard/Cities';
import AddAgent from './pages/AdminDashboard/AddAgent';
import ReportViolation from './pages/UserDashboard/ReportViolation';

// User Dashboard Imports
import UserLayout from './layout/UserLayout';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import MyReports from './pages/UserDashboard/MyReports';
import EditReport from './pages/UserDashboard/EditReport';
import UserProfile from './pages/UserDashboard/UserProfile';
import ChatbotPage from './pages/UserDashboard/ChatbotPage';
import Leaderboard from './pages/UserDashboard/Leaderboard';
import HelpPage from './pages/UserDashboard/HelpPage';
import Settings from "./pages/UserDashboard/SettingsPage";

// Officer Dashboard Imports
import OfficerLayout from './layout/OfficerLayout';
import OfficerDashboard from './pages/OfficerDashboard/OfficerDashboard';
import OfficerReports from './pages/OfficerDashboard/OfficerReports';
import ReportDetailPage from './pages/OfficerDashboard/ReportDetailPage';
import OfficerProfile from './pages/OfficerDashboard/OfficerProfile';
import OfficerSettingsPage from './pages/OfficerDashboard/OfficerSettingsPage';
import UnassignedReports from './pages/OfficerDashboard/UnassignedReports';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      {/* Public Pages */}
      <Route
        index
        element={
          <>
            <PageTitle title="Home | Mass Reporting App" />
            <Home />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <PageTitle title="Login | Mass Reporting App" />
            <LoginPage />
          </>
        }
      />
      <Route
        path="/select-user-type"
        element={
          <>
            <PageTitle title="Select User Type | Mass Reporting App" />
            <UserTypeSelectionPage />
          </>
        }
      />
      <Route
        path="/signup/citizen"
        element={
          <>
            <PageTitle title="Citizen Sign Up | Mass Reporting App" />
            <CitizenSignUp />
          </>
        }
      />
      <Route
        path="/signup/officer"
        element={
          <>
            <PageTitle title="Officer Sign Up | Mass Reporting App" />
            <OfficerSignUp />
          </>
        }
      />

      {/* Admin Dashboard Routes */}
      <Route
      path="admin/home"
      element={
        <>
        <PageTitle title="Admin Home | Mass Reporting App" />
        <AdminHome />
        </>
        }
      />
      <Route
        path="/admin/*"
        element={
          <AdminLayout>
            <Routes>
              <Route
                path="dashboard"
                element={
                  <>
                    <PageTitle title="Admin Dashboard | Mass Reporting App" />
                    <DashboardHome />
                  </>
                }
              />
              <Route
                path="complaints"
                element={
                  <>
                    <PageTitle title="Admin Complaints | Mass Reporting App" />
                    <Complaints />
                  </>
                }
              />
              <Route path="complaints/:id" element={<ComplaintDetailPage />} />
              <Route
                path="agents"
                element={
                  <>
                    <PageTitle title="Admin Agents | Mass Reporting App" />
                    <Agents />
                  </>
                }
              />
              <Route
                path="agents/:id"
                element={
                  <>
                    <PageTitle title="Inspector Details | Mass Reporting App" />
                    <AgentDetailPage />
                  </>
                }
              />
              <Route
                path="agents/add-agent"
                element={
                  <>
                    <PageTitle title="Admin Add Agent | Mass Reporting App" />
                    <AddAgent />
                  </>
                }
              />
              <Route
                path="cities"
                element={
                  <>
                    <PageTitle title="Admin Cities | Mass Reporting App" />
                    <Cities />
                  </>
                }
              />
            </Routes>
          </AdminLayout>
        }
      />


      {/* User Dashboard */}
      <Route
        path="/user/*"
        element={
          <UserLayout>
            <Routes>
              <Route
                path="dashboard"
                element={
                  <>
                    <PageTitle title="User Dashboard | Mass Reporting App" />
                    <UserDashboard />
                  </>
                }
              />
              <Route
                path="report-violation"
                element={
                  <>
                    <PageTitle title="User Report Violations | Mass Reporting App" />
                    <ReportViolation />
                  </>
                }
              />
              <Route
                path="my-reports"
                element={
                  <>
                    <PageTitle title="User My Reports | Mass Reporting App" />
                    <MyReports />
                  </>
                }
              />
              <Route path="reports/:id/edit" element={<EditReport />} />
              <Route
                path="user-profile"
                element={
                  <>
                    <PageTitle title="User Profile | Mass Reporting App" />
                    <UserProfile />
                  </>
                }
              />
              <Route
                path="ai-assistant"
                element={
                  <>
                    <PageTitle title="User AI Assistant | Mass Reporting App" />
                    <ChatbotPage />
                  </>
                }
              />
              <Route
                path="leaderboard"
                element={
                  <>
                    <PageTitle title="User Leaderboard | Mass Reporting App" />
                    <Leaderboard />
                  </>
                }
              />
              <Route
                path="help"
                element={
                  <>
                    <PageTitle title="User Help and Guidelines | Mass Reporting App" />
                    <HelpPage />
                  </>
                }
              />
              <Route
                path="settings"
                element={
                  <>
                    <PageTitle title="User Settings | Mass Reporting App" />
                    <Settings />
                  </>
                }
              />
            </Routes>
          </UserLayout>
        }
      />

      {/* Traffic Police Dashboard */}
        {/* Officer Dashboard */}
        <Route
          path="/officer/*"
          element={
            <OfficerLayout>
              <Routes>
                <Route
                  path="dashboard"
                  element={
                    <>
                      <PageTitle title="Officer Dashboard | Mass Reporting App" />
                      <OfficerDashboard />
                    </>
                  }
                />
                <Route
                  path="reports"
                  element={
                    <>
                      <PageTitle title="Officer Reports | Mass Reporting App" />
                      <OfficerReports />
                    </>
                  }
                />
                <Route path="reports/:id" element={<ReportDetailPage />} />
                <Route
                  path="officer-profile"
                  element={
                    <>
                      <PageTitle title="Officer Profile | Mass Reporting App" />
                      <OfficerProfile />
                    </>
                  }
                />
                <Route
                  path="officer-settings"
                  element={
                    <>
                      <PageTitle title="Officer Settings | Mass Reporting App" />
                      <OfficerSettingsPage />
                    </>
                  }
                />
                <Route
                  path="unassigned-reports"
                  element={
                    <>
                      <PageTitle title="Officer Unassigned Reports | Mass Reporting App" />
                      <UnassignedReports />
                    </>
                  }
                />
              </Routes>
            </OfficerLayout>
          }
        />

    </Routes>
  );
}

export default App;
