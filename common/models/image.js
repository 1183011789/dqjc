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
};
