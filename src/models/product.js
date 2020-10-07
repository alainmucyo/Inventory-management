const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class product extends Model {
        static associate(models) {
            // define association here
        }
    }

    product.init({
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        image: {type: DataTypes.STRING, allowNull: true}
    }, {
        sequelize,
        modelName: 'product',
    });
    return product;
};