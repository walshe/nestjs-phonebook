import { Contact } from '../entities/contact.entity';

export class ContactResults {
  totalCount: number;
  contacts: Contact[];
  pageInfo: PageInfo;
}

export class PageInfo {
  page: number;
  totalPages: number;
}
