import { RootState } from "@/redux/reducers/rootReducer";
import { useRouter } from "next/router"
import { connect } from "react-redux";
import React from "react";
import { DetailProps, DetailType, Entry, EpisodeType } from "@/models/mainModels";
import { callDetail, callList } from "@/redux/actions/main";
import { Loader } from "@/components/Loader";
import { ServerStatus } from "@/models/globalModels";
import { Shown } from "@/components/Shown";
import { SideBar } from "@/components/SideBar";
import { EpisodeInfo } from "@/components/Episode";

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
  const [episodeID, setEpisodeID] = React.useState<string>();

  const { detailStatus, detail, list, listStatus } = main
  React.useEffect(() => {
    if (router.isReady) {
      setID(router.query.id?.toString())
      setEpisodeID(router.query.episode?.toString())
      callDetail(router.query.id)
      if (listStatus != ServerStatus.FETCH) callList()
    }
  }, [router])


  const grabItemFromList = (id: string) => {
    if (!list) return null;
    return list.feed.entry.find(i => i.id.attributes["im:id"] == id);
  }
  
  const grabEpisodeFromList = (id: string) => {
    if (!detail) return null;
    return detail.results.find(i => i.trackId.toString() == id);
  }
  
  const clickOnPodcastId = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    router.push(`/podcast/${id}`)
  }
  
  return (
    <div className="Detail">
      <div className='container-flud'>
        <hr />
        <div className='container'>
          <h1 onClick={() => router.push("/")}>Podcaster<span>{">"}</span><span onClick={clickOnPodcastId}><b>{id}</b></span><span>{">"}</span><span>Episode</span><span>{">"}</span><span>{episodeID}</span></h1>
          {(episodeID && listStatus == ServerStatus.FETCH && detailStatus == ServerStatus.FETCH && detail && list && id) ? (
            <Shown>
              <div className="PodcastWrapper row">
                <SideBar onClick={clickOnPodcastId} item={grabItemFromList(id)} />
                <EpisodeInfo episode={grabEpisodeFromList(episodeID)} />
              </div>
            </Shown>
          ) : (
            <Shown>
              <Loader />
            </Shown>
          )}
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)