import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {

  //inject a sequelize dao/repository into this service
  constructor(
    @InjectModel(Contact)
    private contactModel: typeof Contact,
  ) {}

  create(createContactInput: CreateContactInput) {
    return this.contactModel.create({
      firstName :  createContactInput.firstName,
      lastName: createContactInput.lastName,
      email: createContactInput.email,
      homePhone: createContactInput.homePhone ,
      workPhone: createContactInput.workPhone,
      mobilePhone: createContactInput.mobilePhone,
      mailingAddress: createContactInput.mailingAddress
    })
  }

  findAll() {
    return `This action returns all contacts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactInput: UpdateContactInput) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
