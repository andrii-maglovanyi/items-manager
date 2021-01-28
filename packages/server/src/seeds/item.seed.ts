import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { Item } from 'src/items/item.model';

@Seeder({
  model: Item,
  containsForeignKeys: true,
})
export class SeedItem implements OnSeederInit {
  run() {
    const data = [
      {
        title: 'Some item',
        user_id: 1,
      },
      {
        title: 'Another item',
        user_id: 1,
      },
    ];
    return data;
  }

  everyone(data) {
    data.created_at = new Date().toISOString();

    return data;
  }
}
