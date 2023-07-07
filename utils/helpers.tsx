export const textWithElipsis = (title: string, maxChar: number) => {
  if(title.length <= maxChar) return title;
  return `${title.substring(0,maxChar)}...`
}

export const msToTime = (s: number) => {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return hrs + ':' + mins + ':' + secs;
}