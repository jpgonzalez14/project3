import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Events = new Mongo.Collection('events');

Meteor.methods({
    'events.upsert'(groupID, title, description, date) {

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Events.upsert(
            { eventID },
            {
                groupID,
                title,
                description,
                date
            });
       //return Events.findOne({eventID});
    },
    'events.remove'(eventID) {
        Events.remove(eventID);
    },
    'events.get'(groupID) {
        return Events.find({ groupID });
    }

});