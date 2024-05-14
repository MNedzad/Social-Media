module.exports = (sequelize, DataType) =>{

    const Follow =sequelize.define("Follow",{
        Follow:{
            type: DataType.INTEGER,
            allowNull: null
        }
    });
    


    return Follow
}