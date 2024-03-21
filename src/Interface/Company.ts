export interface Company {
  id?: number
  name: string
  location: string
  description: string
  poster_url: string
	elevation?: number
  jobId?: number
  creation_date?: Date
  enableLike?: boolean
}
