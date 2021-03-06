import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
    Meteor.publish('messages', () => {
        if (this.userId) {
            return Messages.find({}).fetch();
        } else {
            return [];
        }
    });
}

Meteor.methods({
    'messages.insert'(channelID, username, text, date) {

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        let messageID = Messages.insert(
            {
                channelID,
                username,
                text,
                date
            });
        return Messages.findOne({_id: messageID});
    },
    'messages.remove'(messageID) {
        Messages.remove(messageID);
    },
    'messages.removeAll'(channelID) {
        Messages.remove({channelID});
    },
    'messages.getAll'(channelID) {
        let chat = Messages.find({ channelID });
        return chat ? chat.fetch() : [];
    }

});