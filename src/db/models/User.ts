import { using } from 'rxjs';
import {
  Column,
  DataType,
  Index,
  Sequelize,
  Table,
} from 'sequelize-typescript';

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  isEnabled2FA: boolean;
}

@Table({ tableName: 'users' })
export class User implements UserAttributes {
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
    defaultValue: Sequelize.literal('uuid_generate_v4()'),
  })
  @Index({ unique: true, using: 'btree', name: 'users_id_key' })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  @Index({ unique: true, using: 'btree', name: 'users_email_key' })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  isEnabled2FA: boolean;

  @Column({
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true,
  })
  createdAt?: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true,
  })
  updatedAt?: Date;
}
