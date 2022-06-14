import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContactsModule } from './contacts/contacts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './phonebook.sqlite',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'dev',
      autoLoadModels: true
    }),
    ContactsModule,
    AuthModule,
  ],
})
export class AppModule {}