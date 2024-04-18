import Sequelize from "sequelize";

import sequelize from "../utils/database";

const Group = sequelize.define("group", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdBy: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default Group;
