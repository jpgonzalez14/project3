
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Users = new Mongo.Collection('usersAux');

Meteor.methods({
    'users.upsert'(name, email, role, groups) {

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Users.upsert(
            { email },
            {
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
        return Users.findOne({ email}).groups;
    }

});
