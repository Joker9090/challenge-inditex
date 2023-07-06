import { DispatchEmptyObject, DispatchObject } from "@/models/globalModels";
import { SongsList } from "@/models/mainModels";
import ApiService from "@/services/ApiService";
import * as t from "../types";

export const callList = () => (dispatch: DispatchObject<SongsList> & DispatchEmptyObject) => {
  dispatch({ type: t.FETCHING_LIST });
  ApiService.getList().then(list => {
    dispatch({ type: t.FETCH_LIST, payload: list });
  }).catch(e => {
    dispatch({ type: t.FETCH_ERROR_LIST });
  })
}