export interface Permission {
  id: string
  allowedRoles: Array<string>
  allowedStorage?: Array<string>
}
