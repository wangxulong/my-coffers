import { Mongo } from 'meteor/mongo';
//账本表
export const Bills = new Mongo.Collection('bills');

let isOwner = function(userId, bills) {
    return bills && bills.owner === userId;
}
Bills.allow({
    update: function(userId, bills) { return isOwner(userId, bills); },
    remove: function(userId, bills) { return isOwner(userId, bills); }
});
Bills.deny({
    update: function(userId, bills, fieldNames) {
        // 只能更改如下两个字段：
        return (_.without(fieldNames, 'title', 'description').length > 0);
    }
});