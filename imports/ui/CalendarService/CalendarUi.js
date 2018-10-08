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
    $('#inputModal').modal('show')
    /*const title = window.prompt('New Event name:');
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
      });*/
  }

  render() {
    let outputModal = (
      <div className="modal fade" id="outputModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
    let inputModal = (
      <div className="modal fade" id="inputModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Task</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Task Name</label>
                <input type="text" className="form-control" ref='name' name='name' aria-describedby="emailHelp" placeholder="Enter Name"/>
              </div>
              <div className="form-group">
                <label>Task Description</label>
                <input type="text" className="form-control" ref='desc' name='desc' placeholder="Description"/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
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
        {inputModal}
        {outputModal}
        <br/>
        <Footer/>
      </div>
    );
  }
}

CalendarUi.propTypes = propTypes;

export default CalendarUi;
