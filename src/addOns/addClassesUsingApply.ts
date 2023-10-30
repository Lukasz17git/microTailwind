
export const addClassesUsingApply = (components: Record<string, string>) => {
   const result: Record<string, { [key: string]: {} }> = {}
   
   for (const [key, value] of Object.entries(components)) {
      result[key] = { [value]: {} }
   }

   return result
}