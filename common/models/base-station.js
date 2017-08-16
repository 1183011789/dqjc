'use strict';
// 基站基本信息
module.exports = function(Basestation) {
    // 模糊查询  rodename    精确查询  classification
    Basestation.fuzzyQuery = function(name, address, callback) {
        Basestation.find({
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
    Basestation.remoteMethod(
        'fuzzyQuery', {
            accepts: [{
                arg: 'name',
                type: 'string'
            }, {
                arg: 'address',
                type: 'string'
            }],
            returns: {
                arg: 'basestations',
                type: [
                    'object'
                ]
            }
        });
};