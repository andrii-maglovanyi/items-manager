import { BadRequestException, ConflictException } from '@nestjs/common';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';

import { Item } from '../items/item.model';

@Table
@ObjectType()
export class User extends Model {
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
    type: DataType.CHAR(255),
    allowNull: false,
    validate: {
      isEmpty(value: string, next: Function): any {
        if (value === null || value.length < 2) {
          const error = new BadRequestException('Name can not be empty');
          next(error);
        }
        next();
      },
    },
  })
  @Field()
  readonly fullName: string;

  @Column({
    type: DataType.CHAR(100),
    allowNull: false,
    validate: {
      isEmail: true,
      isUnique: async (value: string, next: Function): Promise<any> => {
        const isExist = await User.findOne({ where: { email: value } });
        if (isExist) {
          const error = new ConflictException('Email already exists');
          next(error);
        }
        next();
      },
    },
  })
  @Field()
  readonly email: string;

  @Column
  @Field()
  @Exclude()
  readonly password: string;

  @HasMany(() => Item, 'user_id')
  items: Item[];
}
