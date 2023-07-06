import { DispatchEmptyObject, DispatchObject } from "@/models/globalModels";
import { SongsList } from "@/models/mainModels";
import ApiService from "@/services/ApiService";
import * as t from "../types";

const lessThanOneHourAgo = (date: Date) => {
  const HOUR = 1000 * 60 * 60;
  const anHourAgo = Date.now() - HOUR;
  return date.getTime() > anHourAgo;
}

export const callList = () => (dispatch: DispatchObject<SongsList> & DispatchEmptyObject) => {
  dispatch({ type: t.FETCHING_LIST });

  const callApi = () => {
    ApiService.getList().then(list => {
      localStorage.setItem("SongsData",JSON.stringify(list))
      localStorage.setItem("SongsDataDate", new Date().toDateString())
      dispatch({ type: t.FETCH_LIST, payload: list });
    }).catch(e => {
      dispatch({ type: t.FETCH_ERROR_LIST });
    })
  }

  const _date = localStorage.getItem("SongsDataDate")
  const songsData = localStorage.getItem("SongsData")
  if (_date && songsData) {
     const date = new Date(_date)
     if(lessThanOneHourAgo(date)) callApi()
     else dispatch({ type: t.FETCH_LIST, payload: JSON.parse(songsData) });
  } else {
    callApi()
  }
  
}