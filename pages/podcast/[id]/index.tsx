import { RootState } from "@/redux/reducers/rootReducer";
import { useRouter } from "next/router"
import { connect } from "react-redux";
import React from "react";
import { DetailProps, DetailType, Entry, EpisodeType } from "@/models/mainModels";
import { callDetail, callList } from "@/redux/actions/main";
import { Loader } from "@/components/Loader";
import { ServerStatus } from "@/models/globalModels";
import { Shown } from "@/components/Shown";
import { msToTime } from "@/utils/helpers";
import { SideBar } from "@/components/SideBar";
import { Info } from "@/components/Info";

const mapStateToProps = (state: RootState) => {
  const main = state.main;
  return {
    main: main,
  }
}

const mapDispatchToProps = {
  callDetail,
  callList
}

const Detail = ({ main, callDetail, callList }: DetailProps) => {
  const router = useRouter();
  const [id, setID] = React.useState<string>();

  const { detailStatus, detail, list, listStatus } = main
  React.useEffect(() => {
    if (router.isReady) {
      setID(router.query.id?.toString())
      callDetail(router.query.id)
      if (listStatus != ServerStatus.FETCH) callList()
    }
  }, [router])

  const grabItemFromList = (id: string) => {
    if (!list) return null;
    return list.feed.entry.find(i => i.id.attributes["im:id"] == id);
  }
  
  const clickOnEpisode = (i: EpisodeType) => {
      router.push(`/podcast/${id}/episode/${i.trackId}`)
  }

  return (
    <div className="Detail">
      <div className='container-flud'>
        <hr />
        <div className='container'>
          <h1 onClick={() => router.push("/")}>Podcaster<span>{">"}</span><span>{id}</span></h1>
          {(listStatus == ServerStatus.FETCH && detailStatus == ServerStatus.FETCH && detail && list && id) ? (
            <Shown>
              <div className="PodcastWrapper row">
                <SideBar item={grabItemFromList(id)} />
                <Info onClick={clickOnEpisode} detail={detail} />
              </div>
            </Shown>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)