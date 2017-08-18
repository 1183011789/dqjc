'use strict';

module.exports = function(Station) {
  // 模糊查询  StationName    精确查询  StationRank StationNature
    Station.FuzzyPrecision = function(StationName,StationRank,StationNature,callback) {
          Station.find({where: {or: [{StationName:{like: '%'+StationName+'%'}}, {StationRank:StationRank},{StationNature:StationNature}]}},
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
        }
        Station.remoteMethod(
        'FuzzyPrecision', {
            accepts:
          [
            {
                arg: 'StationName',
                type: 'string'
            },{
                arg: 'StationRank',
                type: 'string'
            },{
                arg: 'StationNature',
                type: 'string'
            }
          ],
            returns: [{
                arg: 'rodes',
                type:
                    'object'
                  }]
        });
        // 分页查询
        Station.PagingFind = function(one,callback){
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
        Station.count( {}, function (err, result) {
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
          Station.find({limit:DisplayEveryPage, skip:startpage},
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
        Station.remoteMethod(
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


          Station.RemoveStationRank = function fetchStation(callback) {
            //console.log(this.app.datasources['bjhlb_mysql']);
            var conn = this.app.datasources['bjhlb_mysql'].connector;
            var sql ='SELECT DISTINCT  distinct(StationRank) from Station';
            conn.executeSQL(sql, [], {}, function(err, back) {
              callback(err, back);
            });
          };
          Station.remoteMethod('RemoveStationRank', {
            accepts: [ ],
            returns: { arg: 'rodes', type: ['object'] },
            http: {verb: 'get'},
          });
          Station.RemoveStationNature = function fetchStation(callback) {
            //console.log(this.app.datasources['bjhlb_mysql']);
            var conn = this.app.datasources['bjhlb_mysql'].connector;
            var sql ='SELECT DISTINCT  distinct(StationNature) from Station';
            conn.executeSQL(sql, [], {}, function(err, back) {
              callback(err, back);
            });
          };
          Station.remoteMethod('RemoveStationNature', {
            accepts: [ ],
            returns: { arg: 'rodes', type: ['object'] },
            http: {verb: 'get'},
          });
};
