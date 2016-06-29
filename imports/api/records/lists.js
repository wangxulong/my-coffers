/**
 * Created by wxl on 2016/6/29.
 */
import { Mongo } from 'meteor/mongo';

export const Records = new Mongo.Collection('records');

let isOwner = function(userId, records) {
    return records && records.owner === userId;
}
Records.allow({
    update: function(userId, records) { return isOwner(userId, records); },
    remove: function(userId, records) { return isOwner(userId, records); }
});
Records.deny({
    update: function(userId, records, fieldNames) {
        return (_.without(fieldNames, 'spendTime', 'description','money').length > 0);
    }
});
