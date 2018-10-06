import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Groups = new Mongo.Collection('groups');

Meteor.methods({
    'groups.upsert'(name, description, teachers, students) {

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Groups.upsert(
            { groupID },
            {
                name,
                description,
                teachers,
                students
            });
    },
    'groups.remove'(groupID) {
        Groups.remove(groupID);
    },
    'groups.get'(groups) {
        return Groups.find({ _id:  {$in: groups} });
    }

});