import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import Home from './pages/Home/Home';
import OnlyNotAuthorizedUserHoc from './components/Hocs/OnlyNotAuthorizedUserHoc/OnlyNotAuthorizedUserHoc';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import CONSTANTS from './constants';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import HowItWorks from './pages/HowItWorks/HowItWorks';
import EventPage from './pages/EventPage/EventPage';
import EventsLink from './components/EventComponents/EventsLink/EventsLink';
import OfferReview from './pages/OfferReview/OfferReview';
import { getEvents } from './store/slices/eventSlice';
import { useDispatch } from 'react-redux';
import WithRoleRoute from './components/Hocs/WithRoleRoute/WithRoleRoute';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <EventsLink />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/howItWorks" component={HowItWorks} />
        <Route
          exact
          path="/events"
          component={WithRoleRoute(EventPage, {
            blacklistedRoles: [CONSTANTS.MODERATOR, CONSTANTS.CREATOR],
          })}
        />
        <Route
          exact
          path="/login"
          component={OnlyNotAuthorizedUserHoc(LoginPage)}
        />
        <Route
          exact
          path="/registration"
          component={OnlyNotAuthorizedUserHoc(RegistrationPage)}
        />
        <Route
          exact
          path="/offersReview"
          component={WithRoleRoute(OfferReview, {
            blacklistedRoles: [CONSTANTS.CREATOR, CONSTANTS.CUSTOMER],
          })}
        />
        <Route
          exact
          path="/payment"
          component={WithRoleRoute(Payment, {
            blacklistedRoles: [CONSTANTS.MODERATOR],
          })}
        />
        <Route
          exact
          path="/startContest"
          component={WithRoleRoute(StartContestPage, {
            blacklistedRoles: [CONSTANTS.MODERATOR],
          })}
        />
        <Route
          exact
          path="/startContest/nameContest"
          component={WithRoleRoute(ContestCreationPage, {
            contestType: CONSTANTS.NAME_CONTEST,
            title: 'Company Name',
            blacklistedRoles: [CONSTANTS.MODERATOR],
          })}
        />
        <Route
          exact
          path="/startContest/taglineContest"
          component={WithRoleRoute(ContestCreationPage, {
            contestType: CONSTANTS.TAGLINE_CONTEST,
            title: 'TAGLINE',
            blacklistedRoles: [CONSTANTS.MODERATOR],
          })}
        />
        <Route
          exact
          path="/startContest/logoContest"
          component={WithRoleRoute(ContestCreationPage, {
            contestType: CONSTANTS.LOGO_CONTEST,
            title: 'LOGO',
            blacklistedRoles: [CONSTANTS.MODERATOR],
          })}
        />
        <Route
          exact
          path="/dashboard"
          component={WithRoleRoute(Dashboard, {
            blacklistedRoles: [CONSTANTS.MODERATOR],
          })}
        />
        <Route
          exact
          path="/contest/:id"
          component={WithRoleRoute(ContestPage, {
            blacklistedRoles: [CONSTANTS.MODERATOR],
          })}
        />
        <Route exact path="/account" component={WithRoleRoute(UserProfile)} />
        <Route component={NotFound} />
      </Switch>
      <ChatContainer />
    </Router>
  );
}

export default App;
