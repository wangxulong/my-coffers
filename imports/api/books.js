import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


//账本表
export const Books = new Mongo.Collection('books');


if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('myBooks', function myBooksPublication(owner) {
        console.info(owner+"============================");
        return Books.find({owner:owner});
    });
};



Meteor.methods({
    'books.insert'(book) {
        check(book.title, String);
        check(book.description, String);

        // 判断是否登录
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Books.insert({
            title:book.title,
            description:book.description,
            createdAt: new Date(),
            owner: this.userId,
          
        });

    },
    /*'tasks.remove'(taskId) {
        check(taskId, String);

        Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);

        Tasks.update(taskId, { $set: { checked: setChecked } });
    },*/
});


