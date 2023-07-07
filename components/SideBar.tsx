import { Entry } from "@/models/mainModels"
import { Loader } from "./Loader"

export const SideBar = ({ item }: { item: Entry | null | undefined }) => {
  if (!item) return <div className="col-12 col-md-4 col-lg-3"><Loader /></div>
  console.log("aca",item)
  const grabBestImage = (images: typeof item["im:image"]) => {
    console.log("aca", Object.entries(images))
    return Object.entries(images).map((a) => a[1]).sort((a,b) => (a.attributes.height < b.attributes.height) ? -1 : 1)[0];
  }
  return (
    <div className="col-12 col-md-4 col-lg-3 SideBar">
      <img src={grabBestImage(item["im:image"]).label} />
      <div>
        <p className="mb-0">{item['im:name'].label}</p>
        <p className="mb-0">
          <span>By:</span>
          <span>{item["im:artist"].label}</span>
        </p>
      </div>
      <div>
        <p className="mb-0">
          <span>Description</span>
          <br />
          <span>{item.summary.label}</span>
        </p>
      </div>
    </div>
  )
}
