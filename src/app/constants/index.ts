import { TFiltersTable } from '@models/types/filters';

export const documentTypes: TFiltersTable[] = [
  { text: 'NIT', value: 'NIT' },
  { text: 'Cedula ciudadania', value: 'CC' },
  { text: 'Cedula extranjeria', value: 'CE' },
];

export const roles: TFiltersTable[] = [
  { text: 'Administrador', value: 'admin' },
  { text: 'Cliente', value: 'client' },
  { text: 'Tecnico', value: 'technical' },
];

export const BASE_PATH =
  'https://us-central1-fh-app-dev-da547.cloudfunctions.net/app';
