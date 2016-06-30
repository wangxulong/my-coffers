Router.configure({
    layoutTemplate: 'indexLayout',
});
import { Bills } from '../../api/bills/lists.js';
import { Meteor } from 'meteor/meteor';
import {Records} from '../../api/records/lists.js';
Router.route('/', {
    name: 'home',
    waitOn: function(){
        return  [Meteor.subscribe('myBills',Meteor.userId()), Meteor.subscribe('myAllRecords',Meteor.userId())];
    },

});
 
//账本
Router.route('/books', {name: 'myBooks'});
//添加账本
Router.route('/books/addBook', {name: 'addBook'});


// 账本
Router.route("/bills",{name: 'bills'});
Router.route("/bills/add",{name: 'addBill'});
Router.route("/bills/:_id/edit",{
    name: 'editBill',
    data: function(){
        return Bills.findOne({_id:this.params._id}) ;
    }
});

//明细
Router.route("/bills/:_id/records",{
    name: 'records',
    data: function(){
        Meteor.subscribe("myRecords",this.params._id,Meteor.userId());
        return Bills.findOne({_id: this.params._id});
    }
});
//添加记录
Router.route("/bills/:_id/records/add",{
    name: 'addRecord',
    data: function(){
    return Bills.findOne({_id: this.params._id});
    },
});

AccountsTemplates.configureRoute('signIn',{
    name: 'signin',
    path: '/login',
    template: 'login',
    layoutTemplate: 'indexLayout',
});
AccountsTemplates.configureRoute('signUp');




var requireLogin = function() {
    if (! Meteor.user()) {
        this.render('login');
    } else {
        this.next();
    }
}

Router.onBeforeAction(requireLogin);
//Router.onBeforeAction(requireLogin, {only: 'postSubmit'});