import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsResolver } from './contacts.resolver';
import { Contact } from './entities/contact.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Contact])], // the forFeature() method defines which models are registered
  providers: [ContactsResolver, ContactsService]
})
export class ContactsModule {}
