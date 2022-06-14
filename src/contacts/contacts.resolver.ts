import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ContactsService } from './contacts.service';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';

@Resolver('Contact')
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Mutation('createContact')
  create(@Args('createContactInput') createContactInput: CreateContactInput) {
    return this.contactsService.create(createContactInput);
  }

  @Query('contacts')
  findAll() {
    return this.contactsService.findAll();
  }

  @Query('contact')
  findOne(@Args('id') id: number) {
    return this.contactsService.findOne(id);
  }

  @Mutation('updateContact')
  update(@Args('updateContactInput') updateContactInput: UpdateContactInput) {
    return this.contactsService.update(updateContactInput.id, updateContactInput);
  }

  @Mutation('removeContact')
  remove(@Args('id') id: number) {
    return this.contactsService.remove(id);
  }
}
