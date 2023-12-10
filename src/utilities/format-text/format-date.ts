export type DateFormat =
  | 'm/d/yy'
  | 'mm/dd/yy'
  | 'm/d/yyyy'
  | 'mm/dd/yyyy'
  | 'yyyy-mm-dd';

/**
 * Formats a string or date into the specified date format.
 *
 * @example
 * ```
 * const d1 = formatDate('1/1/23', 'mm/dd/yyyy'); // 01/01/2023
 * const d2 = formatDate(new Date('12/1/2023'), 'yyyy-mm-dd'); // 2023-12-01
 * const d3 = formatDate(''); // throws error
 * ```
 * @param value The value to format.
 * @param format {@link DateFormat} (default: `yyyy-mm-dd`, used for date inputs)
 * @throws Error if `value` cannot be parsed into a valid date.
 * @returns A string formatted in the given date format.
 */
export function formatDate(value: string | Date, format?: DateFormat): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime()))
    throw new Error(`Unable to convert value: ${value} to date.`);

  const [yyyy, mm, dd] = date.toISOString().substring(0, 10).split('-');

  switch (format) {
    case 'm/d/yy':
      return `${+mm}/${+dd}/${yyyy.substring(2)}`;

    case 'mm/dd/yy':
      return `${mm}/${dd}/${yyyy.substring(2)}`;

    case 'm/d/yyyy':
      return `${+mm}/${+dd}/${yyyy}`;

    case 'mm/dd/yyyy':
      return `${mm}/${dd}/${yyyy}`;

    case 'yyyy-mm-dd':
    default:
      return `${yyyy}-${mm}-${dd}`;
  }
}
