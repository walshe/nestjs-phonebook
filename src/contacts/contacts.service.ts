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
      firstName: createContactInput.firstName,
      lastName: createContactInput.lastName,
      email: createContactInput.email,
      homePhone: createContactInput.homePhone,
      workPhone: createContactInput.workPhone,
      mobilePhone: createContactInput.mobilePhone,
      mailingAddress: createContactInput.mailingAddress,
    });
  }

  findAll() {
    return `This action returns all contacts`;
  }

  findOne(id: number) {
    return this.contactModel.findByPk(id);
  }

  async update(id: number, updateContactInput: UpdateContactInput) {
    
    //we dont want to try to update the id field!
    const { id: removedId, ...updateableFields } = updateContactInput;

    const updated = await this.contactModel.update(updateableFields, {
      where: {
        id: id,
      },
    });

    if (updated[0] != 1) {
      throw new Error('Update failure');
    }

    //sqlite doesnt return entity on an update so have to retrieve manually
    return this.findOne(id);
  }

  remove(id: number) {
    return this.contactModel.destroy({
      where: {
        id: id,
      },
    });
  }
}
