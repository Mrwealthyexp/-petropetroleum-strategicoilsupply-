export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [key: string]: boolean | null | undefined };

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  const add = (value: ClassValue): void => {
    if (value === null || value === undefined || value === false || value === '') {
      return;
    }

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      classes.push(String(value));
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => add(item));
      return;
    }

    Object.entries(value).forEach(([key, enabled]) => {
      if (enabled) {
        classes.push(key);
      }
    });
  };

  inputs.forEach(add);

  return classes.join(' ');
}

export const classNames = cn;
