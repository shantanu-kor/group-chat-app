import Sequelize from "sequelize";

import sequelize from "../utils/database";

const UserGroup = sequelize.define("userGroup", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

export default UserGroup;