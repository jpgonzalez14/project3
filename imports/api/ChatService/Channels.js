import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Channels = new Mongo.Collection('channels');

Meteor.methods({
    'channels.upsert'(groupID, name, description) {

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Channels.upsert(
            { channelID },
            {
                groupID,
                name,
                description
            });
    },
    'channels.remove'(channelID) {
        Channels.remove(channelID);
    },
    'channels.get'(groupID) {
        Channels.find({ groupID });
    }

});
