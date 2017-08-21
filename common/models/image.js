module.exports = function(Image) {
	Image.observe('before save', function updateTimestamp(ctx, next) {
		if (ctx.instance) {
			ctx.instance.created=Date.now();
			ctx.instance.lastUpdated=Date.now();
		} else {
			ctx.data.lastUpdated=Date.now();
		}
		next();
	});
	Image.deleteMultiple = function(multiple,callback) {
    //console.log(this.app.datasources['bjhlb_mysql']);

    var conn = this.app.datasources['bjhlb_mysql'].connector;
    // for(var i=0;i<multiple.length;i++){
        //console.log(multiple[i]+"----");
    var sql ='DELETE FROM `Image` where id in (' + multiple.join(',') +')';
    conn.executeSQL(sql, [], {}, function(err, back) {
         callback(err, back);
      });
    // }
  };
  Image.remoteMethod('deleteMultiple', {
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
