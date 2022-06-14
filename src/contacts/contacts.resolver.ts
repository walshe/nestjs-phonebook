import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-guard';
import { ContactsService } from './contacts.service';
import { CreateContactInput } from './dto/create-contact.input';
import { PageRequestInput } from './dto/pageRequest.input';
import { UpdateContactInput } from './dto/update-contact.input';

@Resolver('Contact')
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Mutation('createContact')
  @UseGuards(GqlAuthGuard)
  create(@Args('createContactInput') createContactInput: CreateContactInput) {
    return this.contactsService.create(createContactInput);
  }

  @Query('contacts')
  @UseGuards(GqlAuthGuard)
  findAll(@Args('pageRequestInput') pageRequestInput: PageRequestInput) {
    return this.contactsService.findAll(pageRequestInput);
  }

  @Query('contact')
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id') id: number) {
    return this.contactsService.findOne(id);
  }

  @Mutation('updateContact')
  @UseGuards(GqlAuthGuard)
  update(@Args('updateContactInput') updateContactInput: UpdateContactInput) {
    return this.contactsService.update(updateContactInput.id, updateContactInput);
  }

  @Mutation('removeContact')
  @UseGuards(GqlAuthGuard)
  remove(@Args('id') id: number) {
    return this.contactsService.remove(id);
  }
}
