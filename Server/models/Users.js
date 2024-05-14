module.exports = (sequelize, DataType) =>{

    const Users =sequelize.define("Users",{
        username: {
            type: DataType.STRING,
            allowNull:false,
        },
        email: {
            type: DataType.STRING,
            allowNull:false,
        },
        password: {
            type: DataType.STRING,
            allowNull:false,
        },
    });
    Users.associate = (models) =>{
        Users.hasMany(models.Posts, {
            onDelete: "cascade"
        })
        Users.hasMany(models.Likes,{
            onDelete: "cascade",
        })
        Users.hasMany(models.Comlike,{
            onDelete: "cascade",
        })
        Users.hasMany(models.Follow, {
            onDelete: "cascade",
        })
        Users.hasMany(models.PostSeen, {
            onDelete: "cascade",
        })
        
    }


    return Users
}