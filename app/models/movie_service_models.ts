export interface requestMovie {
  id: number,
  title: string,
  description: string,
  rating: number,
  image: string,
  created_at: string
  updated_at: string
}

export interface requestUpdateMovie {
  id_params: string,
  id: number,
  title: string,
  description: string,
  rating: number,
  image: string,
  created_at: string
  updated_at: string
}

export interface getMovie {
  ID?:number
}