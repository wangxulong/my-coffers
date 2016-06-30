import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Bills } from './lists';

Meteor.methods({
    'bills.insert'(bill){
        // 判断是否登录
        if (! this.userId) {
            Router.go('signin');
            return ;
        }
        check(bill.title, String);
        check(bill.description, String);
        // 判断账本是否唯一
        let result = Bills.findOne({owner:Meteor.userId(),title:bill.title});
        if(result){
            return {
                isExist:true,
                _id : result._id
            };
        }
       let billId =  Bills.insert({
            title:bill.title,
            description:bill.description,
            isSpend:true,
            createdAt: new Date(),
            owner: this.userId,
        });
        return {_id: billId};

    },
});