'use strict';

module.exports = function(Securityequipmentinformation) {
  Securityequipmentinformation.deleteMultiple = function(multiple,callback) {
    //console.log(this.app.datasources['bjhlb_mysql']);

    var conn = this.app.datasources['bjhlb_mysql'].connector;
    // for(var i=0;i<multiple.length;i++){
        //console.log(multiple[i]+"----");
    var sql ='DELETE FROM `SecurityEquipmentInformation` where id in (' + multiple.join(',') +')';
    conn.executeSQL(sql, [], {}, function(err, back) {
         callback(err, back);
      });
    // }
  };
  Securityequipmentinformation.remoteMethod('deleteMultiple', {
    accepts: [
      {
          arg: 'multiple',
          type: '[number]'
      }
    ],
    returns: { arg: 'rodes', type: ['object']},
    http: {verb: 'get'},
  });
  // 模糊查询  Name
    Securityequipmentinformation.FuzzyPrecision = function(Name,AdministrativeDepartment,callback) {
          Securityequipmentinformation.find({where: {or: [{Name:{like: '%'+Name+'%'}},{AdministrativeDepartment:{like: '%'+AdministrativeDepartment+'%'}}]}},
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
        Securityequipmentinformation.remoteMethod(
        'FuzzyPrecision', {
            accepts:
          [
            {
                arg: 'Name',
                type: 'string'
            },{
                arg: 'AdministrativeDepartment',
                type: 'string'
            }
          ],
            returns: {
                arg: 'rodes',
                type: [
                    'object'
                ]
            }
        });
        // 分页查询
        Securityequipmentinformation.PagingFind = function(one,callback){
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
        Securityequipmentinformation.count( {}, function (err, result) {
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
          Securityequipmentinformation.find({limit:DisplayEveryPage, skip:startpage},
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
        Securityequipmentinformation.remoteMethod(
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
