import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Records } from '../lists.js';

if (Meteor.isServer) {
    Meteor.publish('myRecords', function(billId,owner) {
        return Records.find({owner:owner,billId:billId});
    });
    Meteor.publish('myAllRecords', function(owner) {
        return Records.find({owner:owner});
    });
}