import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'
import  { Bills } from '../api/bills/lists.js';
import './body.html';
import './templates/header.html';
import './layouts/index_layout.html';

import { Records } from '../api/records/lists.js'


Template.home.onCreated (function () {

});
//绘制表单
function drawChart(){
    var myChart = echarts.init(document.getElementById('main'));
    Meteor.setInterval(function(){
        window.onresize = myChart.resize;
    },1000);
    var option = {
        title : {
            text: '花费账单统计',
            subtext: '共计：￥' +Session.get('totalSpendMoney')+'',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data: getLegendData()
        },
        toolbox: {
            show : true,
            feature : {
               
                magicType : {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    }
                },
                restore : {show: true},

            }
        },
        calculable : true,
        series : [
            {
                name: '花费统计',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: getSeriesData()
            }
        ]
    };
    myChart.setOption(option);
}

Template.home.rendered = function(){
    getSeriesData();
    drawChart();
    Tracker.autorun(function(){
        drawChart();
    });
};

function getLegendData(){
    let myBills =  Bills.find({owner:Meteor.userId(),isSpend:true}).fetch();
    let legendData = [];
    for(let bill of myBills){
        legendData.push(bill.title);
    }
    return legendData;
}
function getSeriesData(){
    let myBills =  Bills.find({owner:Meteor.userId(),isSpend:true}).fetch();
    let seriesData = [];
    let totalSpendMoney = 0;
    for(let bill of myBills){
        let myBillRecords = Records.find({owner:Meteor.userId(),billId:bill._id}).fetch();
        let allMoney = 0;
        for(let billRecord of myBillRecords){
            allMoney = allMoney+billRecord.money;
        }
        totalSpendMoney = allMoney + totalSpendMoney;
        seriesData.push({name:bill.title,value:allMoney});
    }
    //总的花费支出。。。。
    Session.set('totalSpendMoney',totalSpendMoney);
    //各个支出账单统计
    return seriesData;
}


