module.exports = function (user) {

  // Set the username to the users email address by default.
  user.observe('before save', function setDefaultUsername(ctx, next) {
    if (ctx.instance) {
      if(ctx.isNewInstance) {
        ctx.instance.username = ctx.instance.email; 
      }
      ctx.instance.status = 'created';
      ctx.instance.created = Date.now();
      ctx.instance.lastUpdated = Date.now();

    }else{
      ctx.data.status = 'updated';
      ctx.data.lastUpdated = Date.now();
    }
    next();
  });


  user.afterRemote('create', function(ctx, u, next) {

    var Role = user.app.models.Role;
    var RoleMapping = user.app.models.RoleMapping;

    Role.findOne({
      where: {
        name:'user'
      }
    }, function(err, role) {
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: u.id
      }, function(err, principal) {
        if (err) {
          throw err;
        }
        console.log('Created principal:', principal);
      });
    }); 
    next();
  });

  user.observe('before delete', function(ctx, next) {
    var userId = ctx.where.id;
    if (!userId) {
      next();
      return;
    }
    var RoleMapping = user.app.models.RoleMapping;
    RoleMapping.destroyAll({
      principalId:userId
    }, function(error) {
      if (error) {
        throw err;
      }
       console.log('Delete RoleMapping Error:', error);
    });
    next();
  });
};
