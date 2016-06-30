import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './bills.html';//引入模板
import '../../../api/bills/methods.js';
import { Bills } from '../../../api/bills/lists.js'


Template.bills.onCreated (function () {
    Meteor.subscribe("myBills",Meteor.userId());
});

Template.bills.helpers({
     myBills(){
         return Bills.find({owner:Meteor.userId(),isSpend:true},{ sort: { createdAt: -1 } });
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
        Meteor.call('bills.insert',bill, function(error){
           if(error){
               console.info(error.reason);
              return false;
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

