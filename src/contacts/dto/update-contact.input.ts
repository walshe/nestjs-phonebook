import { CreateContactInput } from './create-contact.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateContactInput extends PartialType(CreateContactInput) {
  id: number;

  firstName: string;

  lastName: string;

  email: string;

  homePhone: string;

  mobilePhone: string;

  workPhone: string;

  mailingAddress: string;
}
