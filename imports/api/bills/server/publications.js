import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Bills } from '../lists.js';

if (Meteor.isServer) {
    Meteor.publish('myBills', function(owner) {
        return Bills.find({owner:owner});
    });
}