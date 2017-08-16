'use strict';
//检修口基本信息 
module.exports = function(Serviceport) {
    // 模糊查询  name    精确查询  address
    Serviceport.fuzzyQuery = function(name, address, callback) {
        Serviceport.find({
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
    Serviceport.remoteMethod(
        'fuzzyQuery', {
            accepts: [{
                arg: 'name',
                type: 'string'
            }, {
                arg: 'address',
                type: 'string'
            }],
            returns: {
                arg: 'serviceports',
                type: [
                    'object'
                ]
            }
        });
};