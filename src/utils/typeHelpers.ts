export type StrictObject<TExpected, T> = T extends TExpected
   ? Exclude<keyof T, keyof TExpected> extends never
   ? T
   : T & { TS_ERROR: `TYPESCRIPT ERROR: THERE ARE EXCESS PROPERTIES IN OBJECT` }
   : TExpected

export type OmitFirstTwoArguments<T extends any[]> = T extends [any, any, ...infer U] ? U : never