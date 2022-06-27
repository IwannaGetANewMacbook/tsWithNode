import { DataTypes, Model } from "sequelize";
import { dbType } from "./index";
import { sequelize } from "./sequelize"

class User extends Model {
  // 클래스의 필드값에 !를 붙여주는 이유는 해당 속성(변수)가 반드시 존재한다는 의미.
  public readonly id!: number
  public nickname!: string
  public userId!: string
  public passWord!: string 
  // readonly가 붙은 속성은 바꿀일이 없는 것.
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

}

User.init({
  nickname: {
    type: DataTypes.STRING(20),
  },
  userId: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  password: { 
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  sequelize,
  // modelName은 테이블과 모델에 대한 설정
  modelName: "user",
  tableName: "user",
  // characterSet을 utf-8로 해야 한글이 써짐.
  charset: "utf8",
  collate: "utf8_general_ci"  // 한글저장을 위해서
})

export const associate = (db: dbType) => {

}

export default User