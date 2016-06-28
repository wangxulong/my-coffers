Router.configure({
    layoutTemplate: 'indexLayout',
});

Router.route('/', {name: 'home'});
//账本
Router.route('/books', {name: 'books',
    data:function(){
         return Meteor.subscribe('myBooks');
    }
});
//添加账本
Router.route('/books/addBook', {name: 'addBook'});

AccountsTemplates.configureRoute('signIn',{
    name: 'signin',
    path: '/login',
    template: 'login',
    layoutTemplate: 'indexLayout',
});
AccountsTemplates.configureRoute('signUp');