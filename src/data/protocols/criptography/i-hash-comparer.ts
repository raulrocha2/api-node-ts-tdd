export interface IHashComparer {
  compare: (value: string, valueHash: string) => Promise<boolean>
}
