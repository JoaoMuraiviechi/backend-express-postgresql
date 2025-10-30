import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/postgres";
import { User } from "./User";

interface NoteAttributes {
  id: number;
  title: string;
  content?: string;
  tags?: string[];
  pinned?: boolean;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface NoteCreationAttributes extends Optional<NoteAttributes, "id"> {}

export class Note extends Model<NoteAttributes, NoteCreationAttributes> implements NoteAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public tags!: string[];
  public pinned!: boolean;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Note.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    tags: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    pinned: { type: DataTypes.BOOLEAN, defaultValue: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "notes",
    timestamps: true,
  }
);

// Relacionamento
User.hasMany(Note, { foreignKey: "userId" });
Note.belongsTo(User, { foreignKey: "userId" });
