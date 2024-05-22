import { TFiltersTable } from '../data/types/filters';

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

export const brands: TFiltersTable[] = [
  { text: 'Ricoh', value: 'ricoh' },
];

export type TUserType = 'admin' | 'client' | 'technical';
export const BASE_PATH =
  'https://us-central1-fh-fotocopiadoras-del-huila.cloudfunctions.net/app';


export const maxSizeFile: number = 2000000;
