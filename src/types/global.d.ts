declare global {
  // eslint-disable-next-line no-var
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;

  interface String {
    /**
     * Capitalizes the first character of a string.
     *
     * @param string - The input string to be capitalized.
     * @returns A new string with the first character converted to uppercase, leaving the rest of the string unchanged.
     */
    toCapitalized(): string;

    /**
     * Converts a string to 'Title Case`, where the first character of each word is capitalized.
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
}

export type MenuOptionType = "edit" | "delete" | "duplicate";
export interface MenuOption<T extends MenuOptionType = MenuOptionType> {
  id: T;
  render?: boolean;
  label: string;
  icon?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  tooltip?: string;
  onClick: (event: React.MouseEvent, id: T) => void;
}
