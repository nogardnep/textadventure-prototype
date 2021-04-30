export interface WithModifiers {
  getModifiers(): {[key: string]: {
    value: number,
    condition?:() => boolean
  }}
}
