'use strict';
////道口 
module.exports = function(LevelCrossing) {
    // 模糊查询  rodename    精确查询  classification
    LevelCrossing.fuzzyQuery = function(name, address, callback) {
        LevelCrossing.find({
                where: {
                    or: [{
                            levelcrossname: { like: '%' + name + '%' }
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
    LevelCrossing.remoteMethod(
        'fuzzyQuery', {
            accepts: [{
                arg: 'levelcrossname ',
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