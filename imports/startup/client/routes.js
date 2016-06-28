Router.configure({
    layoutTemplate: 'indexLayout',
});

Router.route('/', {name: 'home'});
AccountsTemplates.configureRoute('signIn',{
    name: 'signin',
    path: '/login',
    template: 'login',
    layoutTemplate: 'indexLayout',
});
AccountsTemplates.configureRoute('signUp');