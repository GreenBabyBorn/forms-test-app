import { defineStore } from 'pinia'
export const useFormResultStore = defineStore('formResult', () => {
  const formResults: { id: number; message: string }[] = []

  function addResult(result: { id: number; message: string }) {
    formResults.push(result)
  }
  return { formResults, addResult }
})
