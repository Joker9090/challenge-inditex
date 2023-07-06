import { RootState } from "@/redux/reducers/rootReducer"
import { ServerStatus } from "./globalModels"

export type MainStateProps = {
  listStatus: ServerStatus,
  list?: SongsList
}

export type HomeProps = {
  callList: Function,
  main: MainStateProps
}

export type SongsList = {
  feed: {
    author: Author,
    entry: Entries,
    icon: Icon,
    id: Id,
    link: Link,
    rights: Rights,
    title: Title,
    updated: Updated,
  }
}
export type Labeled = {
  label: string,
}
export type Author = {
 name: Labeled,
 uri: Labeled
}
export type Entry = {
  // category: {
    attributes: {
      "im:id": string,
      label: string,
      scheme: string,
      term: string
    }
    id: Labeled & {
      attributes: {
        "im:id": string,
      }
    },
    "im:artist": Labeled & {
      attributes: {
        href: string,
      }
    },
    "im:contentType": {
      attributes: Labeled & {
        term: string,
      }
    },
    "im:image": {
      [key: number]: Labeled & {
        attributes: {
          height: number
        }
      }
    },
    "im:name": Labeled,
    "im:price": Labeled & {
      attributes: {
        amount: string,
        currency: string,
      }
    },
    "im:releaseDate": Labeled & {
      attributes: Labeled
    },
    link: Labeled & {
      attributes: {
        rel: string,
        href: string,
        type: string,
      }
    },
    rights: Labeled,
    summary: Labeled
    title: Labeled
  // }
}

export type Entries = Entry[]

export type Icon = Labeled;

export type Id = Labeled
export type Link = {
  [key: number]: Labeled & {
    attributes: {
      rel: string,
      type: string,
      href: string,
    }
  }
}
export type Rights = Labeled;
export type Title = Labeled
export type Updated = Labeled


export type ListType = {
  items: Entries,
  onClick: Function
}

export type ListItemType = {
  item: Entry,
  onClick: Function
}