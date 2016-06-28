Meteor.startup(function(){
    //设置国际化
    let lang = window.navigator.userLanguage || window.navigator.language;
    T9n.setLanguage(lang);
});