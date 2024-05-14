module.exports = (sequelize, DataType) =>{

    const Posts =sequelize.define("Posts",{
        title: {
            type: DataType.STRING,
            allowNull:false,
        },
        postText: {
            type: DataType.STRING,
            allowNull:false,
        },
        username: {
            type: DataType.STRING,
            allowNull:false,
        },
        PostRole: {
            type: DataType.STRING,
            allowNull:false
        },
    });
    Posts.associate = (models) =>{
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",
        })
        Posts.hasMany(models.Likes,{
            onDelete: "cascade",
        })
        Posts.hasMany(models.Image,{
            onDelete: "cascade",
        })
        Posts.hasMany(models.PostSeen, {
            onDelete: "cascade",
        })
    }

    return Posts
}