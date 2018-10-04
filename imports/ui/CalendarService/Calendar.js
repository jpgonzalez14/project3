import {Calendar} from '../imports/api/CalendarService/Calendar.js';
import {withTracker} from 'meteor/react-meteor-data';


export default withTracker(() => {
    return {calendar: Calendar.find({})};
})(Calendar); 