import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Groups = new Mongo.Collection('groups');

if (Meteor.isServer) {
    Meteor.publish('groups', () => {
        if (this.userId) {
            return Groups.find({enrolled: this.userId}).fetch();
        } else {
            return [];
        }
    });
}

Meteor.methods({
    'groups.insert'(name, description) {

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        let groupID = Groups.insert(
            {
                owner: this.userId,
                name,
                description,
                enrolled: [this.userId],
                channels: []
            });
        return Groups.findOne({_id: groupID});
    },
    'groups.remove'(groupName) {
        return Groups.remove({name: groupName, owner: this.userId});
    },
    'groups.getAll'() {
        let userGroups = Groups.find({ enrolled: this.userId });
        return userGroups ? userGroups.fetch() : [];
    },
    'groups.getByName'(groupName) {
        let groups = Groups.find({name: groupName});
        return groups ? groups.fetch() : [];
    },
    'groups.enrollUser'(groupID) {
        let group = Groups.findOne({ _id: groupID });
        group.enrolled.push(this.userId);
        Groups.update({_id: groupID}, group);
    }
});
