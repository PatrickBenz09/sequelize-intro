'use strict';

const encryptWithCrypto = require('../helpers/encrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: DataTypes.STRING
  });

  User.beforeCreate(function (model, done) {
    model.password = encryptWithCrypto(model.password, model.salt);

    // User.findOne({ where: { username: model.dataValues.username } })
    // .then(result => {
    //   done("Hiks sudah ada username itu")
    // })
  })

  return User;
};

/*
'use strict';
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  },
  {
    instanceMethods: {
      generateHash: function (password, done) {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, null, done);
        });
      }
    }
  });

  User.beforeCreate(function (model, done) {
    console.log(model);
    model.dataValues.generateHash(model.password, function (err, encrypted) {
        if (err) return done(err);
        model.password = encrypted;
        done();
    })
  })


  return User;
};
*/
