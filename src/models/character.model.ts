import { Optional, Sequelize } from "sequelize";
import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

interface CharacterAttributes {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface CharacterCreationAttributes extends Optional<CharacterAttributes, 'id'> { };

@Table({
  tableName: 'characters',
  timestamps: true,
})
export class Character extends Model<CharacterAttributes, CharacterCreationAttributes> implements CharacterAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  status!: string;

  @Column(DataType.STRING)
  species!: string;

  @Column(DataType.STRING)
  type!: string;

  @Column(DataType.STRING)
  gender!: string;

  @Column(DataType.JSON)
  origin!: {
    name: string;
    url: string;
  };

  @Column(DataType.JSON)
  location!: {
    name: string;
    url: string;
  };

  @Column(DataType.STRING)
  image!: string;

  @Column(DataType.ARRAY(DataType.STRING))
  episode!: string[];

  @Column(DataType.STRING)
  url!: string;

  @Column(DataType.DATE)
  created!: string;
}
