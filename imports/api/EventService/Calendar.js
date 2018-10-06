import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const Calendar = new Mongo.Collection('calendar');
if (Meteor.isServer) {
    Meteor.publish('calendar', () => {
        return Calendar.find({});
    });
}