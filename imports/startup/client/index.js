import '../../ui/body.js';
import '../../ui/templates/accounts/login.html';
import '../../ui/templates/header.html';
import '../../ui/templates/books.html';

import '../../api/books.js';
import '../../ui/templates/book.js';
import  '../../../imports/api/books.js';


// 账单
import '../../ui/templates/bills/bills.js';
import '../../api/bills/lists.js';
//账单明细
import '../../api/records/lists.js';
import '../../ui/templates/records/records.js';

import { Template } from 'meteor/templating';
import  moment from 'moment';

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('YYYY-MM-DD HH:mm ');
});





