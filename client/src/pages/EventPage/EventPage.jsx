import { useDispatch, useSelector } from 'react-redux';
import CreateEventCollapsible from '../../components/CreateEventCollapsible/CreateEventCollapsible';
import CreateEventForm from '../../components/CreateEventForm/CreateEventForm';
import Header from '../../components/Header/Header';
import styles from './EventPage.module.sass';
import { useEffect } from 'react';
import { saveEvents } from '../../store/slices/eventSlice';
import EventsListing from '../../components/EventsListing/EventsListing';
import { getGetAndUpdateEvents } from '../../utils/eventsFunctions';
import { selectEvents } from '../../utils/reselect/eventsReselect';

function EventPage() {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);

  useEffect(() => {
    getGetAndUpdateEvents();
  }, []);
  
  useEffect(() => {
    dispatch(saveEvents());
  }, [events, dispatch]);

  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <CreateEventCollapsible numbOfErrorField={3} ErrorFieldHeight={30}>
          <CreateEventForm />
        </CreateEventCollapsible>
        {events.length !== 0 ? (
          <EventsListing events={events} />
        ) : (
          <p className={styles.emptyText}>You dont have any events for now</p>
        )}
      </main>
    </>
  );
}

export default EventPage;