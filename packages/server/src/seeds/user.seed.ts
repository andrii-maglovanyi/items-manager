import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { User } from 'src/users/user.model';
import * as bcrypt from 'bcrypt';

@Seeder({
  model: User,
})
export class SeedUser implements OnSeederInit {
  run() {
    const data = [
      {
        fullName: 'John Doe',
        email: 'john@mail.com',
        password: 'abcd1234',
      },
    ];
    return data;
  }

  everyone(data) {
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }

    data.created_at = new Date().toISOString();

    return data;
  }
}
