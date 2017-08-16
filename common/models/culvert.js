'use strict';
/**
涵洞基本信息
*/
module.exports = function(Culvert) {
    // 模糊查询  rodename    精确查询  classification
    Culvert.fuzzyQuery = function(name, address, culvertnumber, callback) {
        Culvert.find({
                where: {
                    or: [{
                            culvertname: { like: '%' + name + '%' }
                        },
                        {
                            address: { like: '%' + address + '%' }
                        },
                        {
                            culvertnumber: { like: '%' + culvertnumber + '%' }
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

                    console.log("a---", JSON.stringify(tempResult));
                    callback(null, tempResult);
                } else {
                    callback(err);
                    console.log(err);
                }
            });
    }
    Culvert.remoteMethod(
        'fuzzyQuery', {
            accepts: [{
                arg: 'culvertname',
                type: 'string'
            }, {
                arg: 'address',
                type: 'string'
            }, {
                arg: 'culvertnumber',
                type: 'number'
            }],
            returns: {
                arg: 'culverts',
                type: [
                    'object'
                ]
            }
        });
};