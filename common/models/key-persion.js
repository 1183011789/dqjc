'use strict';
// 重点人
module.exports = function(Keypersion) {
    // 模糊查询  name    精确查询  address
    Keypersion.fuzzyQuery = function(name, residencenow, idnumber, callback) {
        Keypersion.find({
                where: {
                    or: [{
                            name: { like: '%' + name + '%' }
                        },
                        {
                            residencenow: { like: '%' + residencenow + '%' }
                        },
                        {
                            idnumber: { like: '%' + idnumber + '%' }
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
    Keypersion.remoteMethod(
        'fuzzyQuery', {
            accepts: [{
                arg: 'name',
                type: 'string'
            }, {
                arg: 'residencenow',
                type: 'string'
            }, {
                arg: 'idnumber',
                type: 'number'
            }],
            returns: {
                arg: 'keypersions',
                type: [
                    'object'
                ]
            }
        });
};