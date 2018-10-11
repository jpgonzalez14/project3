
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Users = new Mongo.Collection('usersAux');

if (Meteor.isServer) {
    Meteor.publish('usersAux', () => {
        if (this.userId) {
            return Users.findOne({userID: this.userId});
        } else {
            return [];
        }
    });
}

Meteor.methods({
    'users.insert'(name, email, role) {

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Users.insert(
            {
                userID: this.userId,
                name,
                email,
                role,
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
