import {User, post, comment} from './types'

export const Users: User[] = [
  {
    id: 1,
    name: "John Johnson",
    kayfabeName: `Big Fork`,
    billedFrom: "Raccoon City",
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/640px-SNice.svg.png',
    location: 'Dallas, TX',
  },
  {
    id: 2,
    name: "Bill Steve",
    kayfabeName: `Noxous`,
    billedFrom: "Moscow",
    avatar: 'https://kristineskitchenblog.com/wp-content/uploads/2021/09/bacon-in-oven-square-.jpg',
    location: 'Dallas, TX'
  },
  {
    id: 3,
    name: "Jane Wilder",
    kayfabeName: `Jane Wild`,
    billedFrom: "The Heavens",
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/640px-SNice.svg.png',
    location: 'Dallas, TX'
  },
]

// why is author a number?
export const posts: post[] = [
  {
    id: 1,
    text: 'this is my first post',
    timeStamp: 12,
    likes: [2],
    author: 1,
    comments: [],
    authorDetails: {},
  },
  {
    id: 2,
    text: 'sloppy seconds',
    timeStamp: 12,
    likes: [2],
    author: 2,
    comments: [],
    authorDetails: {},
  },
  {
    id: 3,
    text: 'thirsty thirds',
    timeStamp: 12,
    likes: [2],
    author: 3,
    comments: [],
    authorDetails: {},
  },
]