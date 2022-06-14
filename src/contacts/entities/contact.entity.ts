import {
    Column,
    Model,
    Table,
    PrimaryKey,
    Unique,
    AllowNull,
    Length,
    AutoIncrement,
    Index,
  } from 'sequelize-typescript';
  
  //Sequelize uses the annotation to migrate the database

  @Table
  export class Contact extends Model {
  
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @Length({ max: 64 })
    @AllowNull(false)
    @Index //we might want to search sometime
    @Column
    firstName: string;
  
    @Length({ max: 64 })
    @AllowNull(false)
    @Column
    @Index
    lastName: string;
  
    @Length({ max: 128 })
    @Unique
    @Column
    @Index
    email: string;
  
    @Length({ max: 128 })
    @Column
    homePhone: string;
  
    @Length({ max: 128 })
    @Column
    mobilePhone: string;
  
    @Length({ max: 128 })
    @Column
    workPhone: string ;
  
    @Length({ max: 1024 })
    @Column
    mailingAddress: string ;
  }
  