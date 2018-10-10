
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Users = new Mongo.Collection('usersAux');

if (Meteor.isServer) {
    Meteor.publish('userData', function () {
        if (this.userId) {
            return Meteor.users.find({ _id: this.userId }, {
                profile: {currentGroup, currentChannel}
            });
        } else {
            this.ready();
        }
    });
}

Meteor.methods({
    'users.upsert'(name, email, role, groups) {

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Users.upsert(
            { email },
            {
                userID: this.userId,
                name,
                email,
                role,
                groups
            });
    },
    'users.remove'(userID) {
        Users.remove(userID);
    },
    'users.getGroups'(email) {
        return Users.findOne({ email }).groups;
    },
    'users.getUser'(userID) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        return Users.findOne({ userID });
    }

});
