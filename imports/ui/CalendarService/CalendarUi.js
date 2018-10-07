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
    let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
    console.log(allViews);
    var today = new Date();
    const localizer = BigCalendar.momentLocalizer(moment);
    return (
      <div>
        <NavBar/>
        <br/>
        <div className='offset-1 col-7 calendar'>
          <BigCalendar
            selectable
            localizer={localizer}
            views={["week", "day"]}
            events={this.state.events}
            defaultView={BigCalendar.Views.WEEK}
            scrollToTime={new Date(2017, 1, 1, 6)}
            defaultDate={new Date(today.getFullYear(), today.getDate(), today.getMonth()+1)}
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
