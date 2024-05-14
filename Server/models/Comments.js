module.exports = (sequelize, DataType) =>{

    const Comments =sequelize.define("Comments",{
        CommentBody: {
            type: DataType.STRING,
            allowNull:false,
        },
        username: {
            type: DataType.STRING,
            allowNull:false,
        },
    });
    Comments.associate = (models) =>{
        Comments.hasMany(models.Comlike,{
            onDelete: "cascade",
        })
    }
    return Comments
}