'use strict';
/**
铁路基本信息
*/
module.exports = function(Rode) {

  // 模糊查询  rodename    精确查询  classification
    Rode.FuzzyPrecision = function(rodename,classification,callback) {
          Rode.find({where: {or: [{rodename:{like: '%'+rodename+'%'}}, {classification:classification}]}},
                  function (err, result) {
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
        // var conn = this.app.datasources['bjhlb_mysql'].connector;
        // // var sql ='select * from Rode where rodename like '%'+rodename+'%' or classification = '+classification+'';
        // var sql ='select * from Rode where classification = '+classification+'';
        // conn.executeSQL(sql, [], {}, function(err, back) {
        //   callback(err, back);
        // });

        }
        Rode.remoteMethod(
        'FuzzyPrecision', {
            accepts: [{
                arg: 'rodename',
                type: 'string'
            }, {
                arg: 'classification',
                type: 'string'
            }],
            returns: {
                arg: 'rodes',
                type: [
                    'object'
                ]
            }
        });
        // 分页查询
        Rode.PagingFind = function(one,callback){
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


        var pageCount=0;//总页数
        Rode.count( {}, function (err, result) {
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
          Rode.find({limit:DisplayEveryPage, skip:startpage},
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
        Rode.remoteMethod(
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




  Rode.fetchRode = function fetchRode(callback) {
    //console.log(this.app.datasources['bjhlb_mysql']);
    var conn = this.app.datasources['bjhlb_mysql'].connector;
    var sql ='SELECT DISTINCT  distinct(classification) from Rode';
    conn.executeSQL(sql, [], {}, function(err, back) {
      callback(err, back);
    });
  };
  Rode.remoteMethod('fetchRode', {
    accepts: [ ],
    returns: { arg: 'rodes', type: ['object'] },
    http: {verb: 'get'},
  });




};
