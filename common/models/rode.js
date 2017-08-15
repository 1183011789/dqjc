'use strict';
/**
铁路基本信息
*/
module.exports = function(Rode) {

  // 模糊查询  rodename    精确查询  classification
    Rode.greet = function(rodename,classification,callback) {
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
        }
        Rode.remoteMethod(
        'greet', {
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
    
        var one = one-1;
        var last = one+5;
        console.log(last);
          Rode.find({limit:last, skip:one},
            function (err, result) {
              if (!err) {
                var tempResult1 = result.map(function(obj) {
                //  console.log('----'+JSON.stringify(obj) );
                    return obj;
                });
                callback(null, tempResult1);
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
            returns: {
                arg: 'rodes',
                type: [
                    'object'
                ]
            }
          });

};
