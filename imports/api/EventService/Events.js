import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Events = new Mongo.Collection('events');

Meteor.methods({
    'events.upsert'(eventID, title, start, end) {

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Events.upsert(
            { eventID },
            {
                owner: this.userId,
                title,
                start,
                end
            });
       //return Events.findOne({eventID});
    },
    'events.remove'(eventID) {
        Events.remove(eventID);
    },
    'events.getAll'() {
        return Events.find({ owner: this.userId });
    }

});