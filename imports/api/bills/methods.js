import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Bills } from './lists';

Meteor.methods({
    'bills.insert'(bill){
        check(bill.title, String);
        check(bill.description, String);
        // 判断是否登录
        if (! this.userId) {
            Router.go('signin');
            return ;
        }
        Bills.insert({
            title:bill.title,
            description:bill.description,
            isSpend:true,
            createdAt: new Date(),
            owner: this.userId,
        });
    },
});