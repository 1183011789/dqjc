'use strict';
// 隐患场所
module.exports = function(Hiddendangerplace) {
  // 分页查询
  Hiddendangerplace.PagingFind = function(one,callback){
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
  Hiddendangerplace.count( {}, function (err, result) {
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
    Hiddendangerplace.find({limit:DisplayEveryPage, skip:startpage},
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
  Hiddendangerplace.remoteMethod(
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
  /**
   * 头像上传
   * @param {number} userId 用于定位到上传头像的用户
   * @param {string} imgKey 上传成功返回的key
   * @param {string} imgName 文件名
   * @param {string} imgType 文件类型
   * @param {Function(Error, object)} callback
   */
   Hiddendangerplace.uploadAvatar = function(hiddenDangerPlaceId, imgKey, imgName, imgType, cb) {
     // console.log(userId, imgKey, imgName, imgType);
     var ImageModel = this.app.models.Image;
     var UserModel = this;
     var image = {
       key: imgKey,
       mimeType: imgType||'image',
       name: imgName,
       url: 'http://obxk6rroh.bkt.clouddn.com/' + imgKey,
       hiddenDangerPlaceId: hiddenDangerPlaceId,
       container: 'aoc-hiddenDangerPlaces',
     };
     // console.log('---------------received-----------------')
     HiddendangerplaceModel.findById(hiddenDangerPlaceId, function(err, hiddenDangerPlace) {
       // console.log('---------------find-----------------')
       if (err) return cb(err);
       if (!hiddenDangerPlace) return cb(new Error('hiddenDangerPlace有误'));
       // console.log('---------------set-----------------')
       hiddendangerplace.updateAttribute('avatar', image, function(err, hiddenDangerPlace) {
         cb(err, image);
       });
     });
   };

   Hiddendangerplace.remoteMethod('uploadAvatar', {
     accepts: [
       {
         arg: 'hiddenDangerPlaceId',
         type: 'number',
         required: true,
         description: '用于定位到上传头像的用户'
       },
       {
         arg: 'imgKey',
         type: 'string',
         required: true,
         description: '上传成功返回的key'
       },
       {
         arg: 'imgName',
         type: 'string',
         required: false,
         description: '文件名'
       },
       {
         arg: 'imgType',
         type: 'string',
         required: false,
         description: '文件类型'
       }
     ],
     returns: [
       {
         arg: 'image',
         type: 'object',
         description: 'image'
       }
     ],
     description: '头像上传'
   });
};
