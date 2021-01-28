import {
  BelongsTo,
  ForeignKey,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ObjectType, Field, ID } from '@nestjs/graphql';

import { User } from '../users/user.model';

@Table
@ObjectType()
export class Item extends Model {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED,
    unique: true,
  })
  @Field(() => ID)
  readonly id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  @Field()
  title: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER.UNSIGNED,
  })
  user_id: number;

  @BelongsTo(() => User, 'user_id')
  @Field(() => User, { name: 'user' })
  user: User;
}
