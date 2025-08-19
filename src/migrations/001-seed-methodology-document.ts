import { createGenericMigration } from './utils/generic-migration';

export const seedMethodologyDocument = createGenericMigration(
  '001',
  'Seed Methodology Document',
  {
    dataFile: 'methodology-document.json',
    queryFilter: {
      type: '_System_Document__Documentation_Driven_Development_Methodology_',
      field: 'name_id',
      value: 'ddd-methodology-v1'
    }
  }
);
