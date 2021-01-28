import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, ID } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { ItemsService } from './items.service';
import { Item } from './item.model';
import { CurrentUser } from '../users/current-user.decorator';
import { VoidScalar } from '../common/void.scalar';

@Resolver('Items')
@UseGuards(GqlAuthGuard)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [Item])
  async items() {
    return this.itemsService.getItems();
  }

  @Mutation(() => Item)
  async create(@Args('title') title: string, @CurrentUser() user: any) {
    return this.itemsService.create(title, user.id);
  }

  @Mutation(() => Item)
  async update(
    @Args({ name: 'id', type: () => ID }) id: number,
    @Args('title') title: string,
    @CurrentUser() user: any,
  ) {
    return this.itemsService.update(id, title, user.id);
  }

  @Mutation(() => VoidScalar, { nullable: true })
  async delete(@Args({ name: 'id', type: () => ID }) id: number) {
    await this.itemsService.delete(id);

    return null;
  }
}
