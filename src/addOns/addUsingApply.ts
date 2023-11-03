import { UsingApplyRecord } from "./addUsingApply.types"

export const addUsingApply = (components: UsingApplyRecord) => {
   const result: Record<string, { [key: string]: {} }> = {}

   for (const [key, value] of Object.entries(components)) {
      result[key] = { [value]: '' }
   }

   return result
}