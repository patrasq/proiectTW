'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user_friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  user_friend.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    friend_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'user_friend',
  });

  // User.associate = (models) => {
  //   User.belongsToMany(models.User, {
  //     as: 'friends',
  //     through: 'user_friends',
  //     foreignKey: 'user_id',
  //     otherKey: 'friend_id'
  //   });
  // };
  
  return user_friend;
};
