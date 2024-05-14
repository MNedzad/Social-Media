module.exports = (sequelize, DataType) =>{

    const Image =sequelize.define("Image",{
        ImageName: {
            type: DataType.STRING,
            allowNull: false,
        },
    });

    return Image
}