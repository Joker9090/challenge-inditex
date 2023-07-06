import { ServerStatus } from "@/models/globalModels";
import { MainStateProps } from "@/models/mainModels";
import * as t from "../types";

const MainState: MainStateProps = {
  listStatus: ServerStatus.IDLE,
};

const main = (state = MainState, action: any) => {
  console.log("[DEBUG] main reducer", action)
  switch (action.type) {
    case t.FETCHING_LIST:
      return {
        ...state,
        listStatus: ServerStatus.FETCHING,
      }
    case t.FETCH_LIST:
      return {
        ...state,
        listStatus: ServerStatus.FETCH,
        list: action.payload,
      }
      case t.FETCH_ERROR_LIST:
      return {
        ...state,
        listStatus: ServerStatus.FETCH_ERROR,
      }
    default:
      return { ...state };
  }
}

export default main;