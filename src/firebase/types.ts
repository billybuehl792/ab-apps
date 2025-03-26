export interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: number;
}

export interface Material {
  id: string;
  label: string;
  value: number;
  description: string;
}
