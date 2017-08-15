'use strict';
/**
铁路基本信息
*/
module.exports = function(Rode) {

    Rode.observe('before save', function setDefaultUsername(ctx, next) {
        console.log("ctx-----", JSON.stringify(ctx));
        if (ctx.instance) {
            ctx.instance.created = Date.now();
            ctx.instance.lastUpdated = Date.now();
        } else {
            ctx.data.lastUpdated = Date.now();
        }
        next();
    });

    Rode.listMapRodes = function(rodename, classification, fn) {
        console.log(rodename, classification);
        var ParkModel = this;
        // 'SELECT p.* \ FROM  Rode AS p\  WHERE X(coordinate) \BETWEEN ' + bottomLeftLat + '\AND ' + topRightLat + ' \ AND Y(coordinate) \ BETWEEN ' + bottomLeftLng + ' \AND ' + topRightLng + ' \';
        // var sql = 'select * from Rode where rodename LIKE ' + '%' + rodename + '%' +
        //     'or classification =' + classification;
        // console.log('sql---', sql);
        // ParkModel.app.datasources.mzbaseserver_mysql.Rode.query(sql, function(err, result) {
        //     var self = ParkModel.app.datasources.demo.Rode;
        //     if (!err) {
        //         var tempResult = result.map(function(obj) {
        //             return self.fromDatabase('Rode', obj);
        //         });
        //         fn(null, tempResult);
        //     } else {
        //         fn(err);
        //         console.log(err);
        //     }
        // });
        console.log(rodename, classification);
        Rode.find({
            // where: {
            rodename: rodename,
            classification: classification,
            limit: 3
                // }
        }, function(err, rodes) {
            console.log("rodes---", JSON.stringify(rodes));
            if (rodes) {
                // var tempResult = rodes.map(function(obj) {
                //     return obj;
                // });
                // console.log('tempResult---', JSON.stringify(tempResult));
                fn(null, rodes)
            } else {
                fn(err);
            }
        })

    };
    Rode.remoteMethod(
        'listMapRodes', {
            accepts: [{
                arg: 'rodename',
                type: 'string'
            }, {
                arg: 'classification',
                type: 'string'
            }],
            returns: {
                arg: 'rodes',
                type: [
                    'object'
                ]
            }
        });
};