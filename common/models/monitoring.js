'use strict';
//监控设备信息
module.exports = function(Monitoring) {
    // 模糊查询    精确查询  
    Monitoring.fuzzyQuery = function(DeviceName, Address, Number, callback) {
        Monitoring.find({
                where: {
                    or: [{
                            DeviceName: { like: '%' + DeviceName + '%' }
                        },
                        {
                            Address: { like: '%' + Address + '%' }
                        },
                        {
                            Number: { like: '%' + Number + '%' }
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
    Monitoring.remoteMethod(
        'fuzzyQuery', {
            accepts: [{
                arg: 'DeviceName',
                type: 'string'
            }, {
                arg: 'Address',
                type: 'string'
            }, {
                arg: 'Number',
                type: 'number'
            }],
            returns: {
                arg: 'monitorings',
                type: [
                    'object'
                ]
            }
        });
};