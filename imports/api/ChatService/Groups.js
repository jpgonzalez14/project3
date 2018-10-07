import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Groups = new Mongo.Collection('groups');

Meteor.methods({
    'groups.insert'(name, description, teachers, students) {

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        let groupID = Groups.insert(
            {
                owner: this.userId,
                name,
                description,
                teachers,
                students
            });
        return Groups.findOne({_id: groupID});
    },
    'groups.remove'(groupID) {
        Groups.remove(groupID);
    },
    'groups.getAll'() {
        let userGroups = Groups.find({ owner: this.userId });
        if (userGroups) return userGroups.fetch();
        else return [];
    }

});