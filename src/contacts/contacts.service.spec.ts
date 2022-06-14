import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';

import { Model, Sequelize } from 'sequelize-typescript';
import { Contact } from './entities/contact.entity';
import { PageRequestInput } from './dto/pageRequest.input';

const createContactObj = () => {
  const contact = new Contact();
  contact.firstName = 'unit test first name';
  contact.lastName = 'unit test last name';
  contact.email = 'test@test.com';
  contact.workPhone = '123';
  contact.mobilePhone = '345';
  contact.homePhone = '567';
  contact.mailingAddress = 'street1, stree2, city, country';

  delete contact.id;

  return contact;
};

describe('ContactsService', () => {
  let service: ContactsService;
  let memDb: Sequelize;

  beforeEach(async () => {

    //init an inmemory db for tests
    memDb = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    });

    memDb.addModels([Contact]);

    await memDb.sync();

    //make sure db tables are empty before each test
    await memDb.truncate();

    service = new ContactsService(Contact);
    
  });

  afterEach(async () => {});

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    //verify db is empty

    let contactResults = await service.findAll(new PageRequestInput());

    expect(contactResults.contacts).toEqual([]);
    expect(contactResults.pageInfo.totalPages).toEqual(1);

    //do the create
    const contact = createContactObj();

    await service.create(contact);

    //now verify we can find
    contactResults = await service.findAll(new PageRequestInput());

    expect(contactResults.pageInfo.totalPages).toEqual(1);

    expect(contactResults.contacts.length).toEqual(1);

    expect(contactResults.contacts[0].id).toBeDefined();

    const { id, createdAt, updatedAt, ...fieldsToVerify } =
      contactResults.contacts[0];

    expect(contactResults.contacts[0]).toEqual(fieldsToVerify);
  });

  it('findOne', async () => {
    //verify db is empty

    let contactResults = await service.findAll(new PageRequestInput());

    expect(contactResults.contacts).toEqual([]);
    expect(contactResults.pageInfo.totalPages).toEqual(1);

    //do the create
    const contact = createContactObj();

    const created = await service.create(contact);

    //test
    const retrieved = await service.findOne(created.id);

    console.log('retrieved', retrieved.get());

    //verify
    expect(retrieved.get()).toBeDefined();

    const { id, createdAt, updatedAt, ...retrievedFieldsToVerify } =
      retrieved.get();

    const {
      id: x,
      createdAt: y,
      updatedAt: z,
      ...objFieldsToCheck
    } = contact.get();

    expect(retrievedFieldsToVerify).toEqual(objFieldsToCheck);
  });

  it('remove', async () => {
    //verify db is empty

    let contactResults = await service.findAll(new PageRequestInput());

    expect(contactResults.contacts).toEqual([]);
    expect(contactResults.pageInfo.totalPages).toEqual(1);

    //insert soemthing
    const contact = createContactObj();

    const created = await service.create(contact);

    let retrieved = await service.findOne(created.id);
    expect(retrieved.get()).toBeDefined();

    //remove
    await service.remove(created.id);

    //verify not there
    retrieved = await service.findOne(created.id);
    expect(retrieved).toBeNull();
  });


  it('update', async () => {
    //verify db is empty

    let contactResults = await service.findAll(new PageRequestInput());

    expect(contactResults.contacts).toEqual([]);
    expect(contactResults.pageInfo.totalPages).toEqual(1);

    //insert soemthing
    const contact = createContactObj();

    const created = await service.create(contact);

    let retrieved = await service.findOne(created.id);
    expect(retrieved.get()).toBeDefined();

    contact.firstName = "updated name";

    //update
    await service.update(created.id, contact.get());

    //verify field was updated
    retrieved = await service.findOne(created.id);
    expect(retrieved.get().firstName).toBe("updated name")
  });
});
