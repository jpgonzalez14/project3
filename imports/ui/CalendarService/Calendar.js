import {Calendar} from '../imports/api/CalendarService/Calendar.js';
import {withTracker} from 'meteor/react-meteor-data';


export default withTracker(() => {
    Meteor.subscribe('calendar');
    return {
        calendar: Calendar.find({}).fetch,
        user: Meteor.user()
    };
})(Calendar); 