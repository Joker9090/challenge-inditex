import { DispatchEmptyObject, DispatchObject } from "@/models/globalModels";
import { DetailType, PodcastList } from "@/models/mainModels";
import ApiService from "@/services/ApiService";
import * as t from "../types";

const lessThanOneHourAgo = (date: number) => {
  const HOUR = 1000 * 60 * 60;
  const anHourAgo = Date.now() - HOUR;
  return date > anHourAgo;
}

export const callList = () => (dispatch: DispatchObject<PodcastList> & DispatchEmptyObject) => {
  dispatch({ type: t.FETCHING_LIST });

  const callApi = () => {
    ApiService.getList().then(list => {
      localStorage.setItem("PodcasData",JSON.stringify(list))
      localStorage.setItem("PodcasDataDate", new Date().getTime().toString())
      dispatch({ type: t.FETCH_LIST, payload: list });
    }).catch(e => {
      dispatch({ type: t.FETCH_ERROR_LIST });
    })
  }

  const _date = localStorage.getItem("PodcasDataDate")
  const PodcasData = localStorage.getItem("PodcasData")
  if (_date && PodcasData) {
     if(!lessThanOneHourAgo(Number(_date))) callApi()
     else dispatch({ type: t.FETCH_LIST, payload: JSON.parse(PodcasData) });
  } else {
    callApi()
  }
  
}

export const callDetail = (id: string) => (dispatch: DispatchObject<DetailType> & DispatchEmptyObject) => {
  dispatch({ type: t.FETCHING_DETAIL });
  const callApi = () => {
    ApiService.getDetail(id).then(detail => {
      localStorage.setItem("PostcadDate-"+id, new Date().getTime().toString())
      localStorage.setItem("Postcad-"+id, JSON.stringify(detail))
      dispatch({ type: t.FETCH_DETAIL, payload: detail });
    }).catch(e => {
      dispatch({ type: t.FETCH_ERROR_DETAIL });
    })
  }
  const _date = localStorage.getItem("PostcadDate-"+id)
  const detailData = localStorage.getItem("Postcad-"+id)
  if (_date && detailData) {
     if(!lessThanOneHourAgo(Number(_date))) callApi()
     else dispatch({ type: t.FETCH_DETAIL, payload: JSON.parse(detailData) });
  } else {
    callApi()
  }
  
}
