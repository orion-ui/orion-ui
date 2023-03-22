interface Array<T> {
  distinct(distinctBy?: keyof T): T[];
  first(): T | undefined;
  last(): T | undefined;
  delete(target: T, key?: keyof T, deleteCount?: number): T[];
  deleteWhere<K extends keyof T>(key: K, keyValue: T[K]): T[];
  deleteWhere(key: ((x: T) => boolean)): T[];
  empty(): T[];
  toggle(target: T[][number], key?: keyof T[][number]): T[];
  mapKey<K extends keyof T>(keyPath?: K): T[K][];
  findByKey<K extends keyof T>(keyValue: T[K], key?: K): T | undefined;
  pushUniq(item: T): T[];
}

interface Date {
  toPost(withTime?: boolean): string
  toOffset(): string
  isBissextile(): boolean
  getOrdinalDate(): number
	getTimeBetween(pattern?: string, date?: Date): string
  getWeekNumber(): number
	getWeekDays(): {
    monday: Date;
    tuesday: Date;
    wednesday: Date;
    thursday: Date;
    friday: Date;
    saturday: Date;
    sunday: Date;
	}
  getWeekDates<S extends string = 'start', E extends string = 'end'>(startKey?: S, endKey?: E): { [key in S | E]: Date; }
  hasFiftyThreeWeeks(): boolean
  setDateToFirstDow(): Date
  setDateToLastDow(): Date
  toReadable(pattern?: string): string;
  toMidnight(): Date
  toEndOfDay(): Date
}

interface Number {
  toHoursMinutes(separator?: string): string;
  withDelimiters(thousands?: string, decimal?: string): string;
  toCurrency(currency?: string): string;
  decimal(precision?: number): number;
}

interface String {
  toPost(): string;
  toReadableDate(pattern?: string): string;
  insert(string: string, index?: number, replace?: boolean): string;
  pluralize(quantity: number, quantityIncluded?: boolean): string;
  hashCode(): number;
	mark(valueToMark?: string): string;
}
