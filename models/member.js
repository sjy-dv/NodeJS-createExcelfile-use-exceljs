module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define(
        'member',
        {
            id : {
                type : DataTypes.INTEGER,
                primaryKey : true,
                autoIncrement : true
            },
            username : {
                type : DataTypes.STRING
            },
            password : {
                type : DataTypes.STRING
            }
        },
        {
            freezeTableName : true,
            timestamps : false
        }
    );
    return Member;
}