import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { GqlAuthGuard } from './gql-auth.guard';
import { ExtractJwt } from 'passport-jwt';
import { User } from '../users/user.model';
import { UsersService } from 'src/users/users.service';
import { VoidScalar } from '../common/void.scalar';

@Resolver('Items')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async loggedInUser(@Context() context: any) {
    const payload = ExtractJwt.fromExtractors([
      (request: Request) => {
        return request.cookies.Authentication;
      },
    ]);

    const jwt = payload(context.req);
    return await this.authService.getUserByToken(jwt);
  }

  @Mutation(() => User)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: any,
  ) {
    const id = await this.authService.validateUser(email, password);
    if (!id) {
      throw new UnauthorizedException('User credentials are invalid');
    }

    const cookie = this.authService.getCookieWithJwtToken(id);
    context.res.setHeader('Set-Cookie', cookie);

    return await this.userService.findById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => VoidScalar, { nullable: true })
  async logout(@Context() context: any) {
    const cookie = this.authService.getCookieForLogOut();
    context.res.setHeader('Set-Cookie', cookie);

    return null;
  }
}
