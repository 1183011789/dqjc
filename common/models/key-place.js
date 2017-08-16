'use strict';
// 重点场所基本信息
module.exports = function(Keyplace) {
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
            returns: {
                arg: 'keyplaces',
                type: [
                    'object'
                ]
            }
        });
};