'use strict';
// 横跨铁桥
module.exports = function(Crossironbridge) {

  // 模糊查询  rodename    精确查询  classification
   Crossironbridge.fuzzyQuery = function(name, address, callback) {
       Crossironbridge.find({
               where: {
                   or: [{
                           ironbridgename: { like: '%' + name + '%' }
                       },
                       {
                           address: { like: '%' + address + '%' }
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
   Crossironbridge.remoteMethod(
       'fuzzyQuery', {
           accepts: [{
               arg: 'ironbridgename',
               type: 'string'
           }, {
               arg: 'address',
               type: 'string'
           }],
           returns: {
               arg: 'crossironbridges',
               type: [
                   'object'
               ]
           }
       });
  // 分页查询
  Crossironbridge.PagingFind = function(one,callback){
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
  Crossironbridge.count( {}, function (err, result) {
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
    Crossironbridge.find({limit:DisplayEveryPage, skip:startpage},
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
  Crossironbridge.remoteMethod(
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
