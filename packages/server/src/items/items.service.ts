import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Item } from './item.model';
import { User } from '../users/user.model';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item)
    private itemModel: typeof Item,
  ) {}

  async getItems(): Promise<Item[]> {
    return await this.itemModel.findAll({
      include: [{ model: User, as: 'user' }],
    });
  }

  async create(title: string, userId: number): Promise<Item> {
    return await this.itemModel.create<Item>({ title, user_id: userId });
  }

  async update(id: number, title: string, userId: number): Promise<Item> {
    const item = await this.itemModel.findByPk<Item>(id);

    if (!item.id) {
      throw new NotFoundException();
    }

    item.title = title;
    item.user_id = userId;

    return await item.save();
  }

  async delete(id: number): Promise<void> {
    await this.itemModel.destroy({
      where: { id },
    });
  }
}
