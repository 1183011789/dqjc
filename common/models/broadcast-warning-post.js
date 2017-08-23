'use strict';
// 重点警示柱
module.exports = function(Broadcastwarningpost) {
    // 模糊查询  name
    Broadcastwarningpost.FuzzyPrecision = function(name, callback) {
        Broadcastwarningpost.find({ where: { or: [{ name: { like: '%' + name + '%' } }] } },
            function(err, result) {
                if (!err) {
                    var tempResult = result.map(function(obj) {
                        //  console.log('----'+JSON.stringify(obj) );
                        //return Crossironbridge.fromDatabase('Broadcastwarningpost', obj);
                        return obj;
                    });
                    callback(null, tempResult);
                } else {
                    callback(err);
                    console.log(err);
                }
            });
    }

    Broadcastwarningpost.deleteMultiple = function(multiple, callback) {
        //console.log(this.app.datasources['bjhlb_mysql']);

        var conn = this.app.datasources['bjhlb_mysql'].connector;
        // for(var i=0;i<multiple.length;i++){
        //console.log(multiple[i]+"----");
        var sql = 'DELETE FROM `BroadcastWarningPost` where id in (' + multiple.join(',') + ')';
        conn.executeSQL(sql, [], {}, function(err, back) {
            callback(err, back);
        });
        // }
    };
    Broadcastwarningpost.remoteMethod('deleteMultiple', {
        accepts: [{
            arg: 'multiple',
            type: '[number]'
        }],
        returns: { arg: 'rodes', type: ['object'] },
        http: { verb: 'get' },
    });
    // 模糊查询  name
    Broadcastwarningpost.FuzzyPrecision = function(name, callback) {
        Broadcastwarningpost.find({ where: { or: [{ name: { like: '%' + name + '%' } }] } },
            function(err, result) {
                if (!err) {
                    var tempResult = result.map(function(obj) {
                        //  console.log('----'+JSON.stringify(obj) );
                        //return Crossironbridge.fromDatabase('Broadcastwarningpost', obj);
                        return obj;
                    });
                    callback(null, tempResult);
                } else {
                    callback(err);
                    console.log(err);
                }
            });
    }
    Broadcastwarningpost.remoteMethod(
        'FuzzyPrecision', {
            accepts: [{
                arg: 'name',
                type: 'string'
            }],
            returns: [{
                arg: 'rodes',
                type: 'object'
            }]
        });
    // 分页查询
    //   Broadcastwarningpost.PagingFind = function(one,callback){
    //   var DisplayEveryPage=5;//每页显示记录数
    //   if(one<1){
    //     one=1;
    //   }
    //   one=Math.floor(one);
    // //   function checkRate(one)
    // //   {
    // //   var re = /^[0-9]*[1-9][0-9]*$/;
    // //   if (!re.test(one.rate.value))
    // //   {
    // //   alert("请输入正整数");
    // //   one.rate.focus();
    // //   return false;
    // //   }
    // //   }
    // console.log(one);

    //   var pageCount=0;//总页数
    //   Broadcastwarningpost.count( {}, function (err, result) {
    //     //console.log(result);
    //     var count = result;// 总记录数

    //     if(count % DisplayEveryPage ==0){
    //       pageCount=count/DisplayEveryPage;
    //       //console.log(pageCount);
    //     }else{
    //       pageCount=Math.ceil(count/DisplayEveryPage);
    //       //console.log(pageCount);

    //     }
    //   });

    //     // console.log(pageCount);
    //     //  if (one > pageCount) {
    //     //    one=pageCount;
    //     //  }
    //     var startpage =(one-1)*DisplayEveryPage;
    //   //console.log(startpage);
    //     Broadcastwarningpost.find({limit:DisplayEveryPage, skip:startpage},
    //       function (err, result) {
    //         if (!err) {
    //           var tempResult1 = result.map(function(obj) {
    //           //  console.log('----'+JSON.stringify(obj) );
    //               return obj;
    //           });
    //           callback(null,tempResult1,pageCount);
    //           } else {
    //           callback(err);
    //           console.log(err);
    //           }
    //       });
    //   }
    // Broadcastwarningpost.remoteMethod(
    // 'PagingFind', {
    //     accepts: [{
    //         arg: 'one',
    //         type: 'number'
    //     }],
    //     returns: [
    //       {
    //         arg: 'rodes',
    //         type: 'object'
    //       },
    //       {
    //         arg: 'pageCount',
    //         type: 'number'
    //       }
    //   ]
    //   });
};