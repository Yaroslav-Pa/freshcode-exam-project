import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateHoc from './components/Hocs/PrivateHoc/PrivateHoc';
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
import ModeratorOnlyRoute from './components/Hocs/ModeratorOnlyRoute/ModeratorOnlyRoute';
import OfferReview from './pages/OfferReview/OfferReview';
import { getEvents } from './store/slices/eventSlice';
import { useDispatch } from 'react-redux';
import UsersOnlyRoute from './components/Hocs/UsersOnlyRoute/UsersOnlyRoute';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents());
  }, []);

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
        <Route exact path="/events" component={EventPage} />
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
          component={ModeratorOnlyRoute(OfferReview)}
        />
        <Route exact path="/payment" component={UsersOnlyRoute(Payment)} />
        <Route
          exact
          path="/startContest"
          component={UsersOnlyRoute(StartContestPage)}
        />
        <Route
          exact
          path="/startContest/nameContest"
          component={UsersOnlyRoute(ContestCreationPage, {
            contestType: CONSTANTS.NAME_CONTEST,
            title: 'Company Name',
          })}
        />
        <Route
          exact
          path="/startContest/taglineContest"
          component={UsersOnlyRoute(ContestCreationPage, {
            contestType: CONSTANTS.TAGLINE_CONTEST,
            title: 'TAGLINE',
          })}
        />
        <Route
          exact
          path="/startContest/logoContest"
          component={UsersOnlyRoute(ContestCreationPage, {
            contestType: CONSTANTS.LOGO_CONTEST,
            title: 'LOGO',
          })}
        />
        <Route exact path="/dashboard" component={UsersOnlyRoute(Dashboard)} />
        <Route
          exact
          path="/contest/:id"
          component={UsersOnlyRoute(ContestPage)}
        />
        <Route exact path="/account" component={PrivateHoc(UserProfile)} />
        <Route component={NotFound} />
      </Switch>
      <ChatContainer />
    </Router>
  );
}

export default App;
