import {Provider, ValueOrPromise} from '@loopback/core';
import {inject} from '@loopback/context';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
} from '@loopback/authentication';
import {JWTStrategy} from '../authentication-strategies/JWT.strategy';

export class StrategyResolverProvider
  implements Provider<JWTStrategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
  ) {}
  value(): ValueOrPromise<JWTStrategy | undefined> {
    if (!this.metadata) {
      return Promise.resolve(undefined);
    }

    const name = this.metadata.strategy;
    if (name === 'jwt') {
      return new JWTStrategy();
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }
}
