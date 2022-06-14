import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsResolver } from './contacts.resolver';
import { Contact } from './entities/contact.entity';
import { SequelizeModule } from '@nestjs/sequelize';

//providers - the providers that will be instantiated by the Nest injector and that may be shared at least across this module - a provider is injected as a dependancy to this module
//imports - the list of imported modules that export the providers which are required in this module
@Module({
  imports: [SequelizeModule.forFeature([Contact])], // the forFeature() method defines which models are registered
  providers: [ContactsResolver, ContactsService]
})
export class ContactsModule {}
