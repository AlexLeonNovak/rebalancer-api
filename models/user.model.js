'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const SALT_FACTOR = 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static STATUS_NEW = 'new';
    static STATUS_WAIT = 'wait';
    static STATUS_ACTIVE = 'active';
    static STATUS_INACTIVE = 'inactive';
    static STATUS_BLOCKED = 'blocked';
    static STATUS_DELETED = 'deleted';
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      unique: true
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING
    },
    emailConfirmToken: DataTypes.STRING,
    passwordResetToken: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });

  User.prototype.setPassword = function (password) {
    const salt = bcrypt.genSaltSync(SALT_FACTOR);
    this.passwordHash = bcrypt.hashSync(password, salt);
  }

  User.prototype.isValidPassword = function (password) {
    return bcrypt.compare(String(password), this.passwordHash);
  }

  User.registerJoiSchema = Joi.object({
    firstName: Joi.string().alphanum().label('First name'),
    lastName: Joi.string().alphanum().label('Last name'),
    email: Joi.string().email().label('Email').required(),

    password: Joi.string()
      .min(6)
      .regex(/[a-zA-Z]+/).message('Password must include at least one letter')
      // .regex(/[A-Z]+/).message('Password must include at least one upper letter')
      .regex(/[0-9]+/).message('Password must include at least one number')
      .required()
      .label('Password'),

    confirmPassword: Joi.string()
      .equal(Joi.ref('password'))
      .required()
      .messages({'any.only': '{{#label}} must be equal to Password'})
      .label('Confirm password'),

  });

  return User;
};
