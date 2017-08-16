'use strict';
//应急疏散通道
module.exports = function(Emergencyaccesss) {
    // 模糊查询  name    精确查询  address
    Emergencyaccesss.fuzzyQuery = function(name, address, callback) {
        Emergencyaccesss.find({
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
    Emergencyaccesss.remoteMethod(
        'fuzzyQuery', {
            accepts: [{
                arg: 'name',
                type: 'string'
            }, {
                arg: 'address',
                type: 'string'
            }],
            returns: {
                arg: 'emergencyaccesss',
                type: [
                    'object'
                ]
            }
        });
};