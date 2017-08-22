'use strict';
// 重点场所基本信息
module.exports = function(Keyplace) {
  Keyplace.deleteMultiple = function(multiple,callback) {
    //console.log(this.app.datasources['bjhlb_mysql']);

    var conn = this.app.datasources['bjhlb_mysql'].connector;
    // for(var i=0;i<multiple.length;i++){
        //console.log(multiple[i]+"----");
    var sql ='DELETE FROM `KeyPlace` where id in (' + multiple.join(',') +')';
    conn.executeSQL(sql, [], {}, function(err, back) {
         callback(err, back);
      });
    // }
  };
  Keyplace.remoteMethod('deleteMultiple', {
    accepts: [
      {
          arg: 'multiple',
          type: '[number]'
      }
    ],
    returns: { arg: 'rodes', type: ['object']},
    http: {verb: 'get'},
  });
  // 模糊查询  name    精确查询  address
   Keyplace.fuzzyQuery = function(name, address, callback) {
       Keyplace.find({
               where: {
                   or: [{
                           name: { like: '%' + name + '%' }
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
   Keyplace.remoteMethod(
       'fuzzyQuery', {
           accepts: [{
               arg: 'name',
               type: 'string'
           }, {
               arg: 'address',
               type: 'string'
           }],
           returns: [{
               arg: 'keyplaces',
               type:
                   'object'
                 }]
       });
  // 分页查询
  Keyplace.PagingFind = function(one,callback){
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
  Keyplace.count( {}, function (err, result) {
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
    Keyplace.find({limit:DisplayEveryPage, skip:startpage},
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
  Keyplace.remoteMethod(
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
    Keyplace.uploadPictrue = function (ctx,options,cb){
        options = options || {};
        //if(!options) options = {};
        ctx.req.params.container = 'common1'; // "common" 为之前数据源中root 参数 /server/storage 目录下的文件夹“common” 需要自己创建好
        Keyplace.app.models.Container.upload(ctx.req, ctx.result,
        options, function(err, fileObj) {
          if (err) {
            return cb(null, {
              status: 'failed',
              message: err.message,
            });
          } else {
            // The 'file'below should be the same as field name in the form
            var fileInfoArr = fileObj.files.file;
            var objs = [];
            fileInfoArr.forEach(function(item) {
              objs.push({
                name: item.name,
                type: item.type,
                url: CONTAINER_URL + item.container +
                      '/download/' + item.name,
              });
            });
            Keyplace.create(objs, function(err, instances) {
              if (err) {
                return cb(null, {
                  message: err.message,
                });
              } else {
                cb(null, instances);
              }
            });
          }
        });
    };
    Keyplace.remoteMethod(
      'upload', {
        description: 'Upload a file or more files',
        accepts: [
          {arg: 'ctx', type: 'object', http: {source: 'context'}},
          {arg: 'options', type: 'object', http: {source: 'query'}},
        ],
        returns: {
          arg: 'fileObject', type: 'object', root: true,
        },
        http: {verb: 'post'},
      }
    );
};
