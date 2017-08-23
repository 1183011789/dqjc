'use strict';
var CONTAINERS_URL = '/api/containers/';
module.exports = function(Keyplaceimg) {
  Keyplaceimg.observe('before save', function updateTimestamp(ctx, next) {
    if (ctx.instance) {
      ctx.instance.created=Date.now();
      ctx.instance.lastUpdated=Date.now();
    } else {
      ctx.data.lastUpdated=Date.now();
    }
    next();
  });

  Keyplaceimg.deleteMultiple = function(multiple,callback) {
    //console.log(this.app.datasources['bjhlb_mysql']);

    var conn = this.app.datasources['bjhlb_mysql'].connector;
    // for(var i=0;i<multiple.length;i++){
        //console.log(multiple[i]+"----");
    var sql ='DELETE FROM `KeyPlaceImg` where id in (' + multiple.join(',') +')';
    conn.executeSQL(sql, [], {}, function(err, back) {
         callback(err, back);
      });
    // }
  };
  Keyplaceimg.remoteMethod('deleteMultiple', {
    accepts: [
      {
          arg: 'multiple',
          type: '[number]'
      }
    ],
    returns: { arg: 'rodes', type: ['object']},
    http: {verb: 'get'},
  });
//   /**
// * 重点场所上传
// * @param {number} keyPlaceId 用于定位到上传图片的重点场所基本信息
// * @param {string} imgKey 上传成功返回的key
// * @param {string} imgName 文件名
// * @param {string} imgType 文件类型
// * @param {Function(Error, object)} callback
// */
// Keyplaceimg.uploadAvatar = function(imgKey, imgName, imgType, cb) {
//   // console.log(userId, imgKey, imgName, imgType);
//   var ImageModel = this.app.models.KeyPlaceImg;
//   var KeyplaceModel = this;
//   var image = {
//     key: imgKey,
//     mimeType: imgType||'image',
//     name: imgName,
//     url: 'http://obxk6rroh.bkt.clouddn.com/' + imgKey,
//
//     container: 'aoc-keyPlaces',
//   };
//   // console.log('---------------received-----------------')
// //  KeyplaceModel.findById(keyPlaceId, function(err, keyPlace) {
//     // console.log('---------------find-----------------')
//   //  if (err) return cb(err);
//   //  if (!keyPlace) return cb(new Error('重点场所有误'));
//     // console.log('---------------set-----------------')
//     Keyplaceimg.create(image, function(err, back) {
//       cb(err,back);
//     });
//   //});
// };
//
// Keyplaceimg.remoteMethod('uploadAvatar', {
//   accepts: [
//     {
//       arg: 'imgKey',
//       type: 'string',
//       required: true,
//       description: '上传成功返回的key'
//     },
//     {
//       arg: 'imgName',
//       type: 'string',
//       required: false,
//       description: '文件名'
//     },
//     {
//       arg: 'imgType',
//       type: 'string',
//       required: false,
//       description: '文件类型'
//     }
//   ],
//   returns: [
//     {
//       arg: 'image',
//       type: 'object',
//       description: 'image'
//     }
//   ],
//   description: '重点场所基本信息图片上传'
// });
Keyplaceimg.upload = function(ctx, options, cb) {
  options = options || {};
  // Firstly, you must create folder  /server/storage/common
  ctx.req.params.container = 'common2';
  /**
   * ctx.req    express request object
   * ctx.result express response object
   */
  Keyplaceimg.app.models.Container.upload(ctx.req, ctx.result,
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
        Keyplaceimg.create(objs, function(err, instances) {
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

Keyplaceimg.remoteMethod(
'upload',
  {
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
