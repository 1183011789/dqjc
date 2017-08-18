'use strict';
//监控设备信息
module.exports = function(Monitoring) {
  // 模糊查询    精确查询
  Monitoring.fuzzyQuery = function(DeviceName, Address, Number, callback) {
      Monitoring.find({
              where: {
                  or: [{
                          DeviceName: { like: '%' + DeviceName + '%' }
                      },
                      {
                          Address: { like: '%' + Address + '%' }
                      },
                      {
                          Number: { like: '%' + Number + '%' }
                      }
                  ]
              }
          },
          function(err, result) {
              if (!err) {
                  var tempResult = result.map(function(obj) {
                      //  console.log('----'+JSON.stringify(obj) );
                      //return Rode.fromDatabase('Rode', obj);
                      return obj;
                  });
                  callback(null, tempResult);
              } else {
                  callback(err);
                  console.log(err);
              }
          });
  }
  Monitoring.remoteMethod(
      'fuzzyQuery', {
          accepts: [{
              arg: 'DeviceName',
              type: 'string'
          }, {
              arg: 'Address',
              type: 'string'
          }, {
              arg: 'Number',
              type: 'number'
          }],
          returns: [{
              arg: 'monitorings',
              type:
                  'object'
                }]
      });
  // 分页查询
  Monitoring.PagingFind = function(one,callback){
  var DisplayEveryPage=5;//每页显示记录数
  if(one<1){
    one=1;
  }
  one=Math.floor(one);
//   function checkRate(one)
//   {
//   var re = /^[0-9]*[1-9][0-9]*$/;
//   if (!re.test(one.rate.value))
//   {
//   alert("请输入正整数");
//   one.rate.focus();
//   return false;
//   }
//   }
console.log(one);

  var pageCount=0;//总页数
  Monitoring.count( {}, function (err, result) {
    //console.log(result);
    var count = result;// 总记录数

    if(count % DisplayEveryPage ==0){
      pageCount=count/DisplayEveryPage;
      //console.log(pageCount);
    }else{
      pageCount=Math.ceil(count/DisplayEveryPage);
      //console.log(pageCount);

    }
  });

    // console.log(pageCount);
    //  if (one > pageCount) {
    //    one=pageCount;
    //  }
    var startpage =(one-1)*DisplayEveryPage;
  //console.log(startpage);
    Monitoring.find({limit:DisplayEveryPage, skip:startpage},
      function (err, result) {
        if (!err) {
          var tempResult1 = result.map(function(obj) {
          //  console.log('----'+JSON.stringify(obj) );
              return obj;
          });
          callback(null,tempResult1,pageCount);
          } else {
          callback(err);
          console.log(err);
          }
      });
  }
  Monitoring.remoteMethod(
  'PagingFind', {
      accepts: [{
          arg: 'one',
          type: 'number'
      }],
      returns: [
        {
          arg: 'rodes',
          type: 'object'
        },
        {
          arg: 'pageCount',
          type: 'number'
        }
    ]
    });
};
