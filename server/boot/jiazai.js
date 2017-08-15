const _ = require('lodash');
const PromiseA = require('bluebird');

module.exports = function(app, done) {
    const dataSources = _(app.datasources).values().uniq().value();
    PromiseA.each(dataSources, ds => ds.autoupdate && ds.autoupdate()).then().asCallback(done);
};