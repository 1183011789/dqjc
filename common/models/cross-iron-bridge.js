'use strict';
// 横跨铁桥 
module.exports = function(Crossironbridge) {
    // 模糊查询  rodename    精确查询  classification
    Crossironbridge.fuzzyQuery = function(name, address, callback) {
        Crossironbridge.find({
                where: {
                    or: [{
                            ironbridgename: { like: '%' + name + '%' }
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
    Crossironbridge.remoteMethod(
        'fuzzyQuery', {
            accepts: [{
                arg: 'ironbridgename',
                type: 'string'
            }, {
                arg: 'address',
                type: 'string'
            }],
            returns: {
                arg: 'crossironbridges',
                type: [
                    'object'
                ]
            }
        });

};