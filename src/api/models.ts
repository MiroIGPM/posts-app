export interface IPostType {
  userId: number
  id: string
  title: string
  body: string
}

export interface ICommentType {
  postsId?: number
  id?: number
  name: string
  email?: string
  body: string
}

export interface IUserType {
  id: number
  name: string
  userName: string
  email: string
  adress: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface IPostWithUserName {
  userId: number
  id: string
  title: string
  body: string
  name: string
}
