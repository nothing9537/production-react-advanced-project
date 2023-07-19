/* eslint-disable @typescript-eslint/no-unused-vars */
type Mods = Record<string, boolean | string>

export const classNames = (cls: string, mods: Mods = {}, additional: string[] = []) => [
  cls,
  ...additional.filter(Boolean),
  ...Object.entries(mods)
    .filter(([_, value]) => Boolean(value))
    .map(([cls]) => cls),
]
  .join(' ');
