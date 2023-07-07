import { DetailType, PodcastList } from "@/models/mainModels";
import axios from "axios";

export type globalType = {
  apiInstance?: ApiService;
}

export const ApiUrls = {
  list: "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
  detail :"https://itunes.apple.com/lookup?id=",
  detailConcat: "&media=podcast&entity=podcastEpisode",
  allOrigins: "https://api.allorigins.win/get?url",

}
class ApiService {
  constructor(){

  }

  allOrigins(url: string) {
    return `${ApiUrls.allOrigins}=${encodeURIComponent(url)}`
  }
  
  parseAllOriginData(data: {contents: string, status: { url: string, http_code: number, content_type: string}}) {
    return JSON.parse(data.contents)
  }

  retryWithAllOrigins<T>(url: string,resolve: Function,reject: Function,e: any) {
    axios.get(this.allOrigins(url)).then(response => {
      resolve(this.parseAllOriginData(response.data) as T)
    }).catch(e => this.errorHandler(ApiUrls.list,e,reject))
  }

  errorHandler(url: string, e: string, reject:Function) {
    console.error(`[DEBUG] There was an error in ${url}`,e)
    reject()
  }

  getList() {
    return new Promise<PodcastList>((resolve, reject) => {
      const url = ApiUrls.list;
      axios.get(url).then(response => {
        resolve(response.data as PodcastList)
      }).catch((e) => this.retryWithAllOrigins<PodcastList>(url,resolve,reject,e))
    })
  }

  getDetail(id: string) {
    return new Promise<DetailType>((resolve, reject) => {
      const url = `${ApiUrls.detail}${id}${ApiUrls.detailConcat}`
      axios.get(url).then(response => {
        resolve(response.data as DetailType)
      }).catch((e) =>  this.retryWithAllOrigins<DetailType>(url,resolve,reject,e)) 
    })
  }
}


let ApiServiceSingleton;
if (!(global as globalType).apiInstance) ApiServiceSingleton = new ApiService();
else ApiServiceSingleton = (global as globalType).apiInstance;
export default ApiServiceSingleton as ApiService;