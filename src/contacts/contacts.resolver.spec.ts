import { Test, TestingModule } from '@nestjs/testing';
import { ContactsResolver } from './contacts.resolver';
import { ContactsService } from './contacts.service';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { PageRequestInput } from './dto/pageRequest.input';

const mockContact = {
  firstName : 'unit test first name',
  lastName : 'unit test last name',
  email : 'test@test.com',
  workPhone : '123',
  mobilePhone : '345',
  homePhone : '567',
  mailingAddress : 'street1, stree2, city, country'
}

const mockContactResults = {
  totalCount : 1,
  contacts : [mockContact],
  pageInfo : {
    totalPages : 1,
    page : 0
  }
}

//just does some simple mocking for now
describe('ContactsResolver', () => {
  let resolver: ContactsResolver;

  beforeEach(async () => {
    //mock out the contactService so we can focu on testing logic
    //This method bootstraps a module with its dependencies (similar to the way an application is bootstrapped in the conventional
    // main.ts file using NestFactory.create()), and returns a module that is ready for testing.
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsResolver], 
      providers: [
        {
          provide: ContactsService,
          useValue: {
            create: jest.fn(() => {
              console.log('in the mock create')
              return mockContact
            }),
            findOne: jest.fn(() => {
              return mockContact
            }),
            findAll: jest.fn(() => {
              return mockContactResults;
            }),
            update: jest.fn(() => {
              return mockContact
            }),
            remove: jest.fn(() => {
              return true
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<ContactsResolver>(ContactsResolver);
    
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('create', async() => {
    const createContactInput = new CreateContactInput();
    createContactInput.firstName = 'unit test first name';
    createContactInput.lastName = 'unit test last name';
    createContactInput.email = 'test@test.com';
    createContactInput.workPhone = '123';
    createContactInput.mobilePhone = '345';
    createContactInput.homePhone = '567';
    createContactInput.mailingAddress = 'street1, street2, city, country';

    expect(await resolver.create(createContactInput)).toEqual(mockContact);

    //todo verify call to mock
  });

  it('findOne', async() => {
    
    expect(await resolver.findOne(1)).toEqual(mockContact);
    //todo verify call to mock
  });

  it('update', async() => {
    
    expect(await resolver.update(new UpdateContactInput())).toEqual(mockContact);
    //todo verify call to mock
  });

  it('remove', async() => {
    
    expect(await resolver.remove(1)).toEqual(true);
    //todo verify call to mock
  });

  it('findAll', async() => {
    
    expect(await resolver.findAll(new PageRequestInput())).toEqual(mockContactResults);
    //todo verify call to mock
  });
});
