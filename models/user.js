'use strict';
const {
  Model
} = require('sequelize');

//const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notNull: {
      //     msg: 'A first name is required'
      //   },
      //   notEmpty: {
      //     msg: 'Please provide a first name'
      //   }
      // }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notNull: {
      //     msg: 'A last name is required'
      //   },
      //   notEmpty: {
      //     msg: 'Please provide a last name'
      //   }
      // }
    },
    emailAddress: {
      type: DataTypes.STRING,
      //type: DataTypes.VIRTUAL,
      allowNull: false,
      // unique: {
      //   msg: 'The email address you entered already exists'
      // },
      // validate: {
      //   notNull: {
      //     msg: 'An email address is required'
      //   },
      //   notEmpty: {
      //     msg: 'Please provide an email address'
      //   }
      // }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notNull: {
      //     msg: 'A password is required'
      //   },
      //   notEmpty: {
      //     msg: 'Please provide a password'
      //   },
      //   len: {
      //     args: [8, 20],
      //     msg: 'The password should be between 8 and 20 characters in length'
      //   }
      // }
  },
  // confirmedPassword: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   set(val) {
  //     if ( val === this.password ) {
  //       const hashedPassword = bcrypt.hashSync(val, 10);
  //       this.setDataValue('confirmedPassword', hashedPassword);
  //     }
  //   },
  //   validate: {
  //     notNull: {
  //       msg: 'Both passwords must match'
  //     }
  //   }
  // },
  },  { sequelize });


  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };

  return User;
};