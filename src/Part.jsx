import { secondsToTimestring, timeStringToSeconds } from "./utils";

export const Part = ({ data, index, active, dispatch }) => {
  const tokens = data.split("@");
  const name = tokens[0];
  let [start, end] = tokens[1].split("-");
  start = timeStringToSeconds(start);
  end = timeStringToSeconds(end);

  const part = { start, end, name, index };

  const handlePlay = () => {
    dispatch({ part, type: "play" });
  };

  const handleStop = () => {
    dispatch({ part, type: "reset" });
  };
9
  const handleLoop = () => {
    dispatch({ part, type: "loop" });
  };

  return (
    <tr class="part" data-active={!!active}>
      <td><code>{name}</code></td>
      <td>
        {secondsToTimestring(start)} → {secondsToTimestring(end)}
      </td>
      <td>
        <button onClick={!active ? handlePlay : handleStop}>{!active ? "▷" : "▢"}</button>
      </td>
      <td>
        <button onClick={handleLoop}>↺</button>
      </td>
    </tr>
  );
};
