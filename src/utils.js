export const timeStringToSeconds = (str) => {
  const tokens = str.split(":");
  let seconds = parseFloat(tokens[tokens.length - 1]);
  if (tokens.length > 1) {
    seconds += parseFloat(tokens[tokens.length - 2] * 60);
  }
  if (tokens.length > 2) {
    seconds += parseFloat(tokens[tokens.length - 2] * 60 * 60);
  }
  return seconds;
};

export const secondsToTimestring = (str) => {
  const s = parseInt(str, 10);
  let hours = Math.floor(s / 3600);
  let minutes = Math.floor((s - hours * 3600) / 60);
  let seconds = parseFloat(str) - hours * 3600 - minutes * 60;

  if (hours === 0) {
    hours = "";
  }
  if (minutes < 10 && hours !== 0) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  const time = hours + (hours ? ":" : "") + minutes + ":" + seconds;
  return time;
};
