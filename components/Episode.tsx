import { EpisodeType } from "@/models/mainModels"
import { msToTime } from "@/utils/helpers"
import { Loader } from "./Loader"

export const EpisodeLink = ({ item, onClick }: { item: EpisodeType, onClick: Function }) => {
  return (
    <div className="Episode" onClick={() => onClick(item)}>
      <div>{item.trackName}</div>
      <div>{new Date(item.releaseDate).toLocaleDateString()}</div>
      <div>{msToTime(item.trackTimeMillis)}</div>
    </div>
  )
}

export const EpisodeInfo = ({ episode }: { episode?: EpisodeType | null }) => {
  if (!episode) return <div className="col-12 col-md-4 col-lg-3"><Loader /></div>
  return (
    <div className="col-12 col-md-8 col-lg-9  mt-4 EpisodeInfo">
      <h2>{episode.trackName}</h2>
      <div dangerouslySetInnerHTML={{ __html: episode.shortDescription || episode.description}} />
      <video controls={true} autoPlay={true}>
        <source src={episode.previewUrl} type="audio/mpeg" />
      </video>
    </div>
  )
}
