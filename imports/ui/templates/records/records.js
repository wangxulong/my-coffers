import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './records.html';
import '../../../api/records/methods.js';
import { Records } from '../../../api/records/lists.js'


Template.records.helpers({
    myRecords(){
        return Records.find({owner:Meteor.userId()},{ sort: { createdAt: -1 } });
    },
});

Template.addRecord.helpers({
   
});
//添加账本记录
Template.addRecord.events({
    'submit #addRecord': function(e) {
        e.preventDefault();
        if(!$(e.target).data('bootstrapValidator').isValid()){
            return false;
        }
        let billId = $(e.target).find('[name=billId]').val()
        var record = {
            billId:$(e.target).find('[name=billId]').val(),
            spendTime: new Date( $(e.target).find('[name=spendTime]').val()),
            description: $(e.target).find('[name=description]').val(),
            money: Number.parseFloat($(e.target).find('[name=money]').val())
        };

        Meteor.call('records.insert',record, function(error){
            if(error){
                console.info(error.reason);
                return false;
            }

            Router.go('records',{_id:billId});
        });
    }
});
Template.addRecord.rendered = function(){
    $('#addRecord').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            spendTime: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }
                }
            },
            description: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }
                }
            },
            money: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }
                }
            }

        }
    });
    $('#addRecord').bootstrapValidator().on('success.form.bv', function(e) {
        // 阻止默认事件提交
        e.preventDefault();
    });
};