import React from 'react';
import {Calendar} from './../../api/EventService/Calendar';
import {withTracker} from 'meteor/react-meteor-data';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import events from './Events';

import NavBar from './../layout/NavBar';
import Footer from './../layout/Footer';
import TasksUi from './TasksUi';


const propTypes = {};

class CalendarUi extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { events };
    console.log(this.state);
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name:');
    const desc = window.prompt('Enter description:');
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
            desc,
          },
        ],
      });
  }

  render() {

    var today = new Date();
    const localizer = BigCalendar.momentLocalizer(moment);
    return (
      <div>
        <NavBar/>
        <br/>
        <div className='row'>
          <div className='offset-1 col-10 calendar'>
            <BigCalendar
              selectable
              localizer={localizer}
              views={["week", "day"]}
              events={this.state.events}
              defaultView={BigCalendar.Views.WEEK}
              scrollToTime={new Date(2017, 1, 1, 6)}
              defaultDate={new Date(today.getFullYear(), today.getDate(), today.getMonth()+1)}
              onSelectEvent={event => alert('Name: ' + event.title + '\n' + 'Description: ' + event.desc)}
              onSelectSlot={this.handleSelect}
            />
          </div>
        </div>
        <br/>
        <Footer/>
      </div>
    );
  }
}

CalendarUi.propTypes = propTypes;

export default CalendarUi;
