import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query('login')
  async login(@Args('username') username: string, @Args('password') password: string) {
    
    const user = await this.authService.validateUser(username, password);

    
    if(user){
      //sign a jwt made from the validated user
      return this.authService.login(user)
    }else{
      throw new AuthenticationError("Incorrect username/password")
    }
    
    
  }

  
}
