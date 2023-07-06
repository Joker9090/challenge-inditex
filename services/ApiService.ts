import { SongsList } from "@/models/mainModels";
import axios from "axios";

export type globalType = {
  apiInstance?: ApiService;
}

export const ApiUrls = {
  list: "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
  detail :"https://itunes.apple.com/lookup?id=",
  detailConcat: "&media=podcast&entity=podcastEpisode&limit=20"
}
class ApiService {
  constructor(){

  }

  errorHandler(url: string, e: string, reject:Function) {
    console.error(`[DEBUG] There was an error in ${url}`,e)
    reject()
  }

  getList() {
    return new Promise<SongsList>((resolve, reject) => {
      axios.get(ApiUrls.list).then(response => {
        resolve(response.data as SongsList)
      }).catch((e) => this.errorHandler(ApiUrls.list,e,reject))
    })
  }
}


let ApiServiceSingleton;
if (!(global as globalType).apiInstance) ApiServiceSingleton = new ApiService();
else ApiServiceSingleton = (global as globalType).apiInstance;
export default ApiServiceSingleton as ApiService;