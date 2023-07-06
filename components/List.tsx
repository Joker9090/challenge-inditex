import { Entry, ListItemType, ListType } from "@/models/mainModels"
import React from "react"
import { Shown } from "./Shown"

export const List = ({ items, onClick }: ListType) => {
  const [filter, setFilter] = React.useState("")

  const applyFilter = (item: Entry) => {
    const filterFor = Boolean(
      item["im:name"].label.toLowerCase().indexOf(filter) != -1 ||
      item.title.label.toLowerCase().indexOf(filter) != -1 ||
      item.id.label.toLowerCase().indexOf(filter) != -1 ||
      item["im:releaseDate"].label.toLowerCase().indexOf(filter) != -1
    )
    if (!filter || filter == "")  return true
    if (filterFor) return true
    return false
  }
  return (
    <div className='List'>
      <div className='row'>
        <div className='col-4 ms-auto'>
          <input type="text" onChange={(e) => setFilter(e.target.value.toLowerCase())} />
        </div>
      </div>
      <div className='row'>
        {items.filter(applyFilter).map((i, index) => (
          <Shown key={`ListItem-${index}`} delay={index * 50} >
            <ListItem onClick={onClick} item={i} />
          </Shown>
        ))}
      </div>
    </div>
  )
}

export const ListItem = ({ item, onClick }: ListItemType) => {
  return (
    <div className='ListItem' onClick={() => onClick(item)}>
      <img src={item["im:image"][0].label} />
      <p className="mb-0">{item['im:name'].label}</p>
    </div>
  )
}
