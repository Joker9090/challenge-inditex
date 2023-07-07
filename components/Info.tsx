import { DetailType } from "@/models/mainModels";
import { EpisodeLink } from "./Episode";

export const Info = ({ detail, onClick }: { onClick: Function, detail: DetailType }) => {
  const grabFirstData = detail.results[0];
  let grabList = [...detail.results];
  grabList.shift();

  return (
    <div className="col-12 col-md-8 col-lg-9 Info">
      <div className="row">
        <div className="col-12 mt-2 mt-md-0">
          <p>Episodes: <span><b>{grabList.length}</b></span></p>
        </div>
      </div>
      <div className="InfoList">
        <div className="InfoHead">
          <div>Title</div>
          <div>Date</div>
          <div>Duration</div>
        </div>
        <div className="InfoContent">
          {grabList.map((i: any) => (
            <EpisodeLink key={i.trackId} item={i} onClick={onClick} />
          ))}
        </div>
      </div>
    </div>
  )
}
