import { nanoid } from 'nanoid'

export const getNanoId = () => {
  let nanoid_toke = null
  if (localStorage.getItem('nanoid')) {
    nanoid_toke = window.localStorage.getItem('nanoid')
  } else {
    nanoid_toke = nanoid()
    window.localStorage.setItem('nanoid', nanoid_toke)
  }
  return nanoid_toke
}