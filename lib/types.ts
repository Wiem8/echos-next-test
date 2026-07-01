//************* Right is a subscription entitlement owned by a user *************//
export type Right = string

//************* Site codes used to group newsletters *************//
export type SiteCode = "DEN" | "DAN" | "LAN" | "SAN" | (string & {})

export interface Newsletter {
  id: string
  image: string
  title: string
  description: string
  site: SiteCode
  subscriptions: Right[]
}

export interface User {
  id: string
  firstName: string
  lastName: string
  gender: string
  email: string
  subscriptions: Right[]
}

export interface NewsletterGroup {
  site: SiteCode
  label: string
  newsletters: Newsletter[]
}
