import Sequelize from "sequelize";

import sequelize from "../utils/database";

const Message = sequelize.define('message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: {
        type: Sequelize.STRING(1500),
        allowNull: false
    }
})

export default Message;