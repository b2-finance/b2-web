import { describe, expect, it } from 'vitest';
import { DateFormat, formatDate } from './format-date';

describe(formatDate.name, () => {
  it.each([
    ['1/2/23', 'm/d/yy' as DateFormat, '1/2/23'],
    ['1/22/23', 'm/d/yy' as DateFormat, '1/22/23'],
    ['12/2/23', 'm/d/yy' as DateFormat, '12/2/23'],
    ['12/22/23', 'm/d/yy' as DateFormat, '12/22/23'],
    ['2023-12-22', 'm/d/yy' as DateFormat, '12/22/23'],

    ['1/2/23', 'mm/dd/yy' as DateFormat, '01/02/23'],
    ['1/22/23', 'mm/dd/yy' as DateFormat, '01/22/23'],
    ['12/2/23', 'mm/dd/yy' as DateFormat, '12/02/23'],
    ['12/22/23', 'mm/dd/yy' as DateFormat, '12/22/23'],
    ['2023-12-22', 'mm/dd/yy' as DateFormat, '12/22/23'],

    ['1/2/23', 'm/d/yyyy' as DateFormat, '1/2/2023'],
    ['1/22/23', 'm/d/yyyy' as DateFormat, '1/22/2023'],
    ['12/2/23', 'm/d/yyyy' as DateFormat, '12/2/2023'],
    ['12/22/23', 'm/d/yyyy' as DateFormat, '12/22/2023'],
    ['2023-12-22', 'm/d/yyyy' as DateFormat, '12/22/2023'],

    ['1/2/23', 'mm/dd/yyyy' as DateFormat, '01/02/2023'],
    ['1/22/23', 'mm/dd/yyyy' as DateFormat, '01/22/2023'],
    ['12/2/23', 'mm/dd/yyyy' as DateFormat, '12/02/2023'],
    ['12/22/23', 'mm/dd/yyyy' as DateFormat, '12/22/2023'],
    ['2023-12-22', 'mm/dd/yyyy' as DateFormat, '12/22/2023'],

    ['1/2/23', 'yyyy-mm-dd' as DateFormat, '2023-01-02'],
    ['1/22/23', 'yyyy-mm-dd' as DateFormat, '2023-01-22'],
    ['12/2/23', 'yyyy-mm-dd' as DateFormat, '2023-12-02'],
    ['12/22/23', 'yyyy-mm-dd' as DateFormat, '2023-12-22'],
    ['2023-12-22', 'yyyy-mm-dd' as DateFormat, '2023-12-22'],

    [new Date('1/2/23'), 'm/d/yy' as DateFormat, '1/2/23'],
    [new Date('1/22/23'), 'm/d/yy' as DateFormat, '1/22/23'],
    [new Date('12/2/23'), 'm/d/yy' as DateFormat, '12/2/23'],
    [new Date('12/22/23'), 'm/d/yy' as DateFormat, '12/22/23'],
    [new Date('2023-12-22'), 'm/d/yy' as DateFormat, '12/22/23'],

    [new Date('1/2/23'), 'mm/dd/yy' as DateFormat, '01/02/23'],
    [new Date('1/22/23'), 'mm/dd/yy' as DateFormat, '01/22/23'],
    [new Date('12/2/23'), 'mm/dd/yy' as DateFormat, '12/02/23'],
    [new Date('12/22/23'), 'mm/dd/yy' as DateFormat, '12/22/23'],
    [new Date('2023-12-22'), 'mm/dd/yy' as DateFormat, '12/22/23'],

    [new Date('1/2/23'), 'm/d/yyyy' as DateFormat, '1/2/2023'],
    [new Date('1/22/23'), 'm/d/yyyy' as DateFormat, '1/22/2023'],
    [new Date('12/2/23'), 'm/d/yyyy' as DateFormat, '12/2/2023'],
    [new Date('12/22/23'), 'm/d/yyyy' as DateFormat, '12/22/2023'],
    [new Date('2023-12-22'), 'm/d/yyyy' as DateFormat, '12/22/2023'],

    [new Date('1/2/23'), 'mm/dd/yyyy' as DateFormat, '01/02/2023'],
    [new Date('1/22/23'), 'mm/dd/yyyy' as DateFormat, '01/22/2023'],
    [new Date('12/2/23'), 'mm/dd/yyyy' as DateFormat, '12/02/2023'],
    [new Date('12/22/23'), 'mm/dd/yyyy' as DateFormat, '12/22/2023'],
    [new Date('2023-12-22'), 'mm/dd/yyyy' as DateFormat, '12/22/2023'],

    [new Date('1/2/23'), 'yyyy-mm-dd' as DateFormat, '2023-01-02'],
    [new Date('1/22/23'), 'yyyy-mm-dd' as DateFormat, '2023-01-22'],
    [new Date('12/2/23'), 'yyyy-mm-dd' as DateFormat, '2023-12-02'],
    [new Date('12/22/23'), 'yyyy-mm-dd' as DateFormat, '2023-12-22'],
    [new Date('2023-12-22'), 'yyyy-mm-dd' as DateFormat, '2023-12-22'],
  ])(
    'should convert a value as expected (value=%s, format=%s)',
    (value: string | Date, format: DateFormat, expected: string) => {
      const actual = formatDate(value, format);
      expect(actual).toEqual(expected);
    },
  );

  it.each([
    ['', 'm/d/yy' as DateFormat],
    [' ', 'm/d/yy' as DateFormat],
    ['foo', 'm/d/yy' as DateFormat],
    ['13/1/23', 'm/d/yy' as DateFormat],
    ['12/32/23', 'm/d/yy' as DateFormat],
    ['2023-13-01', 'm/d/yy' as DateFormat],
    ['2023-12-32', 'm/d/yy' as DateFormat],

    ['', 'mm/dd/yy' as DateFormat],
    [' ', 'mm/dd/yy' as DateFormat],
    ['foo', 'mm/dd/yy' as DateFormat],
    ['13/1/23', 'mm/dd/yy' as DateFormat],
    ['12/32/23', 'mm/dd/yy' as DateFormat],
    ['2023-13-01', 'mm/dd/yy' as DateFormat],
    ['2023-12-32', 'mm/dd/yy' as DateFormat],

    ['', 'm/d/yyyy' as DateFormat],
    [' ', 'm/d/yyyy' as DateFormat],
    ['foo', 'm/d/yyyy' as DateFormat],
    ['13/1/23', 'm/d/yyyy' as DateFormat],
    ['12/32/23', 'm/d/yyyy' as DateFormat],
    ['2023-13-01', 'm/d/yyyy' as DateFormat],
    ['2023-12-32', 'm/d/yyyy' as DateFormat],

    ['', 'mm/dd/yyyy' as DateFormat],
    [' ', 'mm/dd/yyyy' as DateFormat],
    ['foo', 'mm/dd/yyyy' as DateFormat],
    ['13/1/23', 'mm/dd/yyyy' as DateFormat],
    ['12/32/23', 'mm/dd/yyyy' as DateFormat],
    ['2023-13-01', 'mm/dd/yyyy' as DateFormat],
    ['2023-12-32', 'mm/dd/yyyy' as DateFormat],

    ['', 'yyyy-mm-dd' as DateFormat],
    [' ', 'yyyy-mm-dd' as DateFormat],
    ['foo', 'yyyy-mm-dd' as DateFormat],
    ['13/1/23', 'yyyy-mm-dd' as DateFormat],
    ['12/32/23', 'yyyy-mm-dd' as DateFormat],
    ['2023-13-01', 'yyyy-mm-dd' as DateFormat],
    ['2023-12-32', 'yyyy-mm-dd' as DateFormat],
  ])(
    'should throw an error if value cannot be parsed to a date (value=%s, format=%s)',
    async (value: string, format: DateFormat) => {
      expect(() => formatDate(value, format)).toThrowError(
        /Unable to convert value:/,
      );
    },
  );
});
