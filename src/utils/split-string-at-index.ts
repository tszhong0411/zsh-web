export const splitStringAtIndex = (value: string, index: number) => {
  if (!value) {
    return ['', '']
  }

  return [value.slice(0, Math.max(0, index)), value.slice(Math.max(0, index))]
}
