import { Template } from 'meteor/templating';
import './add_book.html';

Template.addBook.events({
    'submit form': function(e) {
        e.preventDefault();
        var book = {
            title: $(e.target).find('[name=title]').val(),
            description: $(e.target).find('[name=description]').val()
        };
        Meteor.call("books.insert",book,function(error){
            if (error)
                return alert(error.reason);
         //   Router.go('books');
        });
    }
});