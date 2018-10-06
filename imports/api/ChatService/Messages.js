import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Messages = new Mongo.Collection('messages');

Meteor.methods({
    'messages.upsert'(channelID, username, text, date) {

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Messages.upsert(
            { messageID },
            {
                channelID,
                username,
                text,
                date
            });
    },
    'messages.remove'(messageID) {
        Messages.remove(messageID);
    },
    'messages.get'(channelID) {
        return Messages.find({ channelID });
    }

});