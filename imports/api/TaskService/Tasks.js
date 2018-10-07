import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const tasks = new Mongo.Collection('tasks');

Meteor.methods({
    'tasks.upsert'(title, description, start, end) {

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        tasks.upsert(
            { taskID },
            {
                owner: this.userId,
                title,
                description,
                start,
                end
            });
    },
    'tasks.remove'(taskID) {
        tasks.remove(taskID);
    },
    'tasks.get'() {
        return tasks.find({ owner: this.userId });
    }

});