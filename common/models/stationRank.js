'use strict';

module.exports = function(Stationrank) {
  Stationrank.deleteMultiple = function(multiple,callback) {
    //console.log(this.app.datasources['bjhlb_mysql']);

    var conn = this.app.datasources['bjhlb_mysql'].connector;
    // for(var i=0;i<multiple.length;i++){
        //console.log(multiple[i]+"----");
    var sql ='DELETE FROM `StationRank` where id in (' + multiple.join(',') +')';
    conn.executeSQL(sql, [], {}, function(err, back) {
         callback(err, back);
      });
    // }
  };
  Stationrank.remoteMethod('deleteMultiple', {
    accepts: [
      {
          arg: 'multiple',
          type: '[number]'
      }
    ],
    returns: { arg: 'rodes', type: ['object']},
    http: {verb: 'get'},
  });
};
