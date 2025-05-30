import { type ReactNode, type MouseEvent } from "react";
import { type ToOptions } from "@tanstack/react-router";

declare global {
  // eslint-disable-next-line no-var
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;

  type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
    T,
    Exclude<keyof T, Keys>
  > &
    {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
    }[Keys];

  type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
    T,
    Exclude<keyof T, Keys>
  > &
    {
      [K in Keys]-?: Required<Pick<T, K>> &
        Partial<Record<Exclude<Keys, K>, undefined>>;
    }[Keys];

  interface MenuOption<T = string> {
    id: T;
    render?: boolean;
    label: string;
    icon?: ReactNode;
    selected?: boolean;
    disabled?: boolean;
    color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
    confirm?: boolean | string;
    tooltip?: string;
    disableCloseOnSelect?: boolean;
    onClick?: VoidFunction;
  }

  interface ListItem {
    id: string;
    render?: boolean;
    label: string;
    icon?: ReactNode;
    to?: ToOptions["to"];
    items?: ListItem[];
    disabled?: boolean;
    selected?: boolean;
    expanded?: boolean;
    onClick?: (event: MouseEvent, id: string) => void;
  }

  interface Metadata {
    lastModified: string;
    name: string;
    size: string;
    type: string;
  }

  interface String {
    /**
     * Capitalizes the first character of a string.
     *
     * @param string - The input string to be capitalized.
     * @returns A new string with the first character converted to uppercase, leaving the rest of the string unchanged.
     */
    toCapitalized(): string;

    /**
     * Converts a string to 'Phone Case' ex: `(123) 456-7890`
     *
     * @param string - The input string to be converted to phone case.
     * @returns A new string formatted as a phone number.
     */
    toPhone(): string;

    /**
     * Converts a string to 'Title Case', where the first character of each word is capitalized.
     *
     * @param string - The input string to be converted to title case.
     * @returns A new string with each word's first character capitalized.
     */
    toTitleCase(): string;

    /**
     * Truncates a string to a specified length and appends a custom suffix if the string exceeds that length.
     *
     * @param str - The input string to be truncated.
     * @param options - An object containing the truncation options.
     * @param options.length - The maximum length of the truncated string. If not provided, the original string is returned.
     * @param options.append - The string to append to the truncated string if truncation occurs. Defaults to "...".
     * @returns A new string truncated to the specified length with the suffix appended if truncation occurs, or the original string if no truncation is needed.
     */
    truncate(length?: number, append?: string): string;
  }

  interface Number {
    /**
     * Converts a string to 'USD Case', formatting it as a currency string in USD.
     *
     * @param string - The input string to be converted to USD case.
     * @returns A new string formatted as a currency in USD.
     */
    toUSD(): string;
  }
}
