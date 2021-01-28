import { Args, Mutation, Resolver, Context, Query } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';

import { User } from './user.model';

@Resolver('Users')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => User)
  async signup(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: any,
  ) {
    const userData = await this.usersService.create(
      firstName,
      lastName,
      email,
      password,
    );

    const cookie = this.authService.getCookieWithJwtToken(userData.id);
    context.res.setHeader('Set-Cookie', cookie);
    return userData;
  }
}
