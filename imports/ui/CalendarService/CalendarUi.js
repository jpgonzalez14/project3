import React from 'react';
import {Calendar} from './../../api/EventService/Calendar';
import {withTracker} from 'meteor/react-meteor-data';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import events from './Events';

import NavBar from './../layout/NavBar';
import Footer from './../layout/Footer';


const propTypes = {};

class CalendarUi extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { events };
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      });
  }

  render() {
    //const { localizer } = this.props
    const localizer = BigCalendar.momentLocalizer(moment);
    return (
      <div>
        <NavBar/>
        <br/>
        <div className='container'>
          <BigCalendar
            selectable
            localizer={localizer}
            events={this.state.events}
            defaultView={BigCalendar.Views.WEEK}
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date(2015, 3, 12)}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={this.handleSelect}
          />
        </div>
        <br/>
        <Footer/>
      </div>
    );
  }
}

CalendarUi.propTypes = propTypes;

export default CalendarUi;
