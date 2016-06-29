/**
 * Created by wxl on 2016/6/29.
 */
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Records } from './lists';

Meteor.methods({
    'records.insert'(record){
        console.info(record);
        check(record,{
            description: String,
            spendTime: Date,
            money :Number,
            billId:String,
        });
        // 判断是否登录
        if (! this.userId) {
            Router.go('signin');
            return ;
        }
        Records.insert({
            billId:record.billId,
            spendTime:record.spendTime,
            description:record.description,
            money:record.money,
            createdAt: new Date(),
            owner: this.userId,
        });
    },
});
