import { ServerStatus } from "./globalModels"

export type MainStateProps = {
  listStatus: ServerStatus,
  list?: PodcastList
  detailStatus: ServerStatus,
  detail?: DetailType
}

export type HomeProps = {
  callList: Function,
  main: MainStateProps
}

export type DetailProps = {
  callDetail: Function,
  callList: Function,
  main: MainStateProps
}

export type PodcastList = {
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
  onClick: Function,
  number: number
}

export type DetailType = {
  results: EpisodeType[],
}

export type EpisodeType = {
  artistIds: number[]
  artistViewUrl: string
  artworkUrl60: string
  artworkUrl160: string
  artworkUrl600: string
  closedCaptioning: string
  collectionId: number
  collectionName: string
  collectionViewUrl: string
  contentAdvisoryRating: string
  country: string
  description: string
  episodeContentType: string
  episodeFileExtension: string
  episodeGuid: string
  episodeUrl: string
  feedUrl: string
  genres: { name: string, id: string }[]
  kind: string
  previewUrl: string
  releaseDate: string
  shortDescription: string
  trackId: number
  trackName: string
  trackTimeMillis: number
  trackViewUrl: string
  wrapperType: string
}