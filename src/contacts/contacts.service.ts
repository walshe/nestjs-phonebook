import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContactResults, PageInfo } from './dto/contact.results';
import { CreateContactInput } from './dto/create-contact.input';
import { PageRequestInput } from './dto/pageRequest.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { Contact } from './entities/contact.entity';

const DEFAULT_PAGE_SIZE = 20;

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

  async findAll(pageRequestInput : PageRequestInput) {

    //rudimenatary paging with offset for now - this means we have to do 2 queries - get total count AND the results
    //TODO cursor based pagination  - sequelize has some libs for this

    const contactResults = new ContactResults()  
    contactResults.totalCount = await this.contactModel.count();

    const pageSize = pageRequestInput.pageSize?? DEFAULT_PAGE_SIZE

    contactResults.contacts = await this.contactModel.findAll({
      order: [
        [pageRequestInput.sortField ?? 'firstName', pageRequestInput.sortDir ?? 'ASC'] //default some stuff
      ],
      offset: pageRequestInput.page?? 0 * pageSize, 
      limit: pageSize
    })

    const pageInfo = new PageInfo()
    pageInfo.page = pageRequestInput.page;
    pageInfo.totalPages = contactResults.totalCount <= pageSize ? 1 :  contactResults.totalCount / pageSize

    contactResults.pageInfo = pageInfo
    
    return contactResults;
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
