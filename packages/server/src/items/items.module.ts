import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { SeedItem } from 'src/seeds/item.seed';

import { Item } from './item.model';
import { ItemsResolver } from './items.resolver';
import { ItemsService } from './items.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Item]),
    SeederModule.forFeature([SeedItem]),
  ],
  providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
