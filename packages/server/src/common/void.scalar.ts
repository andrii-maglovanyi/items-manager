import { Scalar, CustomScalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';

@Scalar('Void', (type) => null)
export class VoidScalar implements CustomScalar<void, void> {
  description = 'Void custom scalar';

  parseValue(value): void {
    return null;
  }

  serialize(value): void {
    return null;
  }

  parseLiteral(ast: ValueNode): void {
    return null;
  }
}
