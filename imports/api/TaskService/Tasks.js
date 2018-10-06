import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const tasks = new Mongo.Collection('tasks');

Meteor.methods({
    'tasks.upsert'(groupID, title, description, dueTo) {

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        tasks.upsert(
            { taskID },
            {
                groupID,
                title,
                description,
                dueTo
            });
    },
    'tasks.remove'(taskID) {
        tasks.remove(taskID);
    },
    'tasks.get'(groupID) {
        tasks.find({ groupID });
    }

});