import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Channels = new Mongo.Collection('channels');

if (Meteor.isServer) {
    Meteor.publish('channels', () => {
        Channels.find({}).fetch();
    });
}

Meteor.methods({
    'channels.insert'(groupID, name, description) {

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        let channelID = Channels.insert(
            {
                groupID,
                name,
                description
            });
        return Channels.findOne({ _id: channelID });
    },
    'channels.remove'(channelName, groupID) {
        Channels.remove({ name: channelName, groupID });
        let groupChannels = Channels.find({ groupID });
        return groupChannels ? groupChannels.fetch() : [];
    },
    'channels.removeAll'(groupID) {
        Channels.remove({ groupID });
    },
    'channels.getAll'(groupID) {
        let groupChannels = Channels.find({ groupID });
        return groupChannels ? groupChannels.fetch() : [];
    }

});
