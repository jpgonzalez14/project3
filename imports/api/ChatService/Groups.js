import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Groups = new Mongo.Collection('groups');

Meteor.methods({
    'groups.insert'(name, description, enrolled) {

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        let groupID = Groups.insert(
            {
                owner: this.userId,
                name,
                description,
                enrolled
            });
        return Groups.findOne({_id: groupID});
    },
    'groups.remove'(groupName) {
        Groups.remove({name: groupName, owner: this.userId});
        let groups = Groups.find({ enrolled: this.userId });
        return groups ? groups.fetch() : [];
    },
    'groups.getAll'() {
        let userGroups = Groups.find({ enrolled: this.userId });
        return userGroups ? userGroups.fetch() : [];
    },
    'groups.getByName'(groupName) {
        let groups = Groups.find({name: groupName});
        return groups ? groups.fetch() : [];
    }
});