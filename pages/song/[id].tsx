import { RootState } from "@/redux/reducers/rootReducer";
import { useRouter } from "next/router"
import { connect } from "react-redux";
import React from "react";
import { DetailProps, DetailType } from "@/models/mainModels";
import { callDetail, callEpisode, callList } from "@/redux/actions/main";
import { Loader } from "@/components/Loader";
import { ServerStatus } from "@/models/globalModels";

const mapStateToProps = (state: RootState) => {
  const main = state.main;
  return {
    main: main,
  }
}

const mapDispatchToProps = {
  callDetail,
  callList,
  callEpisode
}


const Detail = ({ main, callDetail, callList, callEpisode }: DetailProps) => {
  const router = useRouter();

  const { detailStatus, detail, list, listStatus } = main
  React.useEffect(() => {
    if (router.isReady) {
      callDetail(router.query.id)
      if(listStatus != ServerStatus.FETCH) callList()
    }
  }, [router])

  React.useEffect(() => {
    if (detail && detailStatus == ServerStatus.FETCH) {
      callEpisode(detail.results[2].episodeUrl)
      
    }
  }, [detailStatus])

  console.log("list",list)
  return (
    <div className="Detail">
      {(listStatus == ServerStatus.FETCH && detailStatus == ServerStatus.FETCH && detail && list) ? (
        <Info detail={detail} />
      ) : (
        <Loader />
      )}
    </div>
  )
}

export const Info = ({detail}: {detail: DetailType}) => {
  return (
    <div className="Info">
      
      {detail.results.map(i => (
        <div key={i.trackId} ><a href={i.previewUrl}>{i.trackName}</a></div>
      ))}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail)