export type StrictObject<TExpected, T> = T extends TExpected
   ? Exclude<keyof T, keyof TExpected> extends never
   ? T
   : `ERROR: THERE ARE EXCESS PROPERTIES IN CREDENTIALS OBJECT`
   : TExpected


