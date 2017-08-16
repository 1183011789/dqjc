'use strict';
/**
涵洞基本信息
*/
module.exports = function(Culvert) {
  // 模糊查询  rodename    精确查询  classification
    Culvert.fuzzyQuery = function(name, address, culvertnumber, callback) {
        Culvert.find({
                where: {
                    or: [{
                            culvertname: { like: '%' + name + '%' }
                        },
                        {
                            address: { like: '%' + address + '%' }
                        },
                        {
                            culvertnumber: { like: '%' + culvertnumber + '%' }
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

                    console.log("a---", JSON.stringify(tempResult));
                    callback(null, tempResult);
                } else {
                    callback(err);
                    console.log(err);
                }
            });
    }
    Culvert.remoteMethod(
        'fuzzyQuery', {
            accepts: [{
                arg: 'culvertname',
                type: 'string'
            }, {
                arg: 'address',
                type: 'string'
            }, {
                arg: 'culvertnumber',
                type: 'number'
            }],
            returns: {
                arg: 'culverts',
                type: [
                    'object'
                ]
            }
        });
  // 分页查询
  Culvert.PagingFind = function(one,callback){
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
  Culvert.count( {}, function (err, result) {
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
    Culvert.find({limit:DisplayEveryPage, skip:startpage},
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
  Culvert.remoteMethod(
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
