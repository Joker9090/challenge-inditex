import { Entry, ListItemType, ListType } from "@/models/mainModels"
import { textWithElipsis } from "@/utils/helpers"
import React from "react"
import { Shown } from "./Shown"

export const List = ({ items, onClick }: ListType) => {
  const [filter, setFilter] = React.useState("")

  const applyFilter = (item: Entry) => {
    const filterFor = Boolean(
      //Filter by artist name
      item["im:name"].label.toLowerCase().indexOf(filter) != -1 ||
      //Filter by title
      item.title.label.toLowerCase().indexOf(filter) != -1 ||
      //Filter by id
      item.id.label.toLowerCase().indexOf(filter) != -1 ||
      //Filter by release Date
      item["im:releaseDate"].label.toLowerCase().indexOf(filter) != -1
    )
    if (!filter || filter == "")  return true
    if (filterFor) return true
    return false
  }
  return (
    <div className='List'>
      <div className='row'>
        <div className='col-12 col-md-6 col-lg-4 ms-auto searcher'>
          <p className="mb-0">Search <span>By: id, artist, title, release date</span></p>
          <input type="text" onChange={(e) => setFilter(e.target.value.toLowerCase())} />
        </div>
      </div>
      <div className='row ListRow'>
        {items.filter(applyFilter).map((i, index) => (
          <Shown key={`ListItem-${index}`} delay={index * 50} >
            <ListItem number={index + 1} onClick={onClick} item={i} />
          </Shown>
        ))}
      </div>
    </div>
  )
}

export const ListItem = ({ number, item, onClick }: ListItemType) => {
  return (
    <div className='ListItem' onClick={() => onClick(item)}>
      <span>{number}</span>
      <img src={item["im:image"][0].label} />
      <p className="mb-0 text-center">{textWithElipsis(item['im:name'].label,50)}</p>
      <p className="mb-0 text-center">
        <span>Author:</span>
        <span>{textWithElipsis(item["im:artist"].label, 10)}</span>
      </p>
    </div>
  )
}
