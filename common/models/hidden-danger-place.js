'use strict';
// 隐患场所
module.exports = function(Hiddendangerplace) {
    // 模糊查询    精确查询  
    Hiddendangerplace.fuzzyQuery = function(name, address, callback) {
        Hiddendangerplace.find({
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
    Hiddendangerplace.remoteMethod(
        'fuzzyQuery', {
            accepts: [{
                arg: 'name',
                type: 'string'
            }, {
                arg: 'address',
                type: 'string'
            }],
            returns: {
                arg: 'hiddendangerplaces',
                type: [
                    'object'
                ]
            }
        });
};