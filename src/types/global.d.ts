export interface User {
  id: string;
  name: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface MenuOption<T = string> {
  id: T;
  render?: boolean;
  label: string;
  icon?: IconDefinition | ReactNode;
  selected?: boolean;
  disabled?: boolean;
  tooltip?: string;
  onClick: (value?: IMenuOption, event?: React.MouseEvent) => void;
}
