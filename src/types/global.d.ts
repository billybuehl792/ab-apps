export interface ClientData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: number;
}

export interface MenuOption<T = string> {
  id: T;
  render?: boolean;
  label: string;
  icon?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  tooltip?: string;
  onClick: (value?: IMenuOption, event?: React.MouseEvent) => void;
}
