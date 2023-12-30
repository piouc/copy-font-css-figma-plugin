export function isNullish(value: any): value is null | undefined {
  return value === null || typeof value === 'undefined'
}

export function isNotNullish<T>(value: T): value is Exclude<T, null | undefined> {
  return !isNullish(value)
}