import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './bills.html';//引入模板
import '../../../api/bills/methods.js';
import { Bills } from '../../../api/bills/lists.js'
import { Records } from '../../../api/records/lists.js'


Template.bills.onCreated (function () {
    Meteor.subscribe("myBills",Meteor.userId());
});

Template.bills.helpers({
     myBills(){
         let myBills = Bills.find({owner:Meteor.userId(),isSpend:true},{ sort: { createdAt: -1 } }).fetch();
         for(let bill of myBills){
             let myBillRecords = Records.find({owner:Meteor.userId(),billId:bill._id}).fetch();
             let allMoney = 0;
             for(let billRecord of myBillRecords){
                 allMoney = allMoney+billRecord.money;
             }
             bill.spendMoney = allMoney;
             bill.recordCount = myBillRecords.length;
         }
         return myBills;
    }, 
});
Template.bills.events({
    'click .delete'(e) {
        e.preventDefault();
        if (confirm("确定要删除吗?")){
            var billsId = this._id;
            Bills.remove(billsId);
            Router.go('bills');
        }
    }
});

//添加账本模板事件
Template.addBill.events({
    'submit #addBill': function(e) {
        e.preventDefault();
        if(!$(e.target).data('bootstrapValidator').isValid()){
            return false;
        }
        var bill = {
            title: $(e.target).find('[name=title]').val(),
            description: $(e.target).find('[name=description]').val()
        };
        Meteor.call('bills.insert',bill, function(error,result){
           if(error){
              return alert(error.reason);;
           }
            if( result.isExist){
                return   alert('账本不允许重名');
            }
            Router.go('bills');
        });
    }
});
Template.addBill.rendered = function(){
    $('#addBill').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            title: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }
                }
            }
        }
    });
    $('#addBill').bootstrapValidator().on('success.form.bv', function(e) {
        // 阻止默认事件提交
        e.preventDefault();
    });
};
Template.editBill.events({
    'submit form': function(e) {
        e.preventDefault();
        if(!$(e.target).data('bootstrapValidator').isValid()){
            return false;
        }
        var billId = this._id;
        var editProps = {
            title: $(e.target).find('[name=title]').val(),
            description: $(e.target).find('[name=description]').val()
        }

        Bills.update(billId, {$set: editProps}, function(error) {
            if (error) {
                // 向用户显示错误信息
                alert(error.reason);
            } else {
               Router.go('bills');
            }
        });
    }
});
Template.editBill.rendered = function(){
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            title: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }
                }
            }
        }
    });
    $('form').bootstrapValidator().on('success.form.bv', function(e) {
        // 阻止默认事件提交
        e.preventDefault();
    });
};

