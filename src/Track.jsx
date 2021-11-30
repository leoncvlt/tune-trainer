import { useState, useEffect, useRef, useReducer } from "preact/hooks";

import jsmediatags from "jsmediatags/dist/jsmediatags.min.js";
import { Part } from "./Part";

export const Track = ({ src }) => {
  const audio = useRef(null);
  const [tracks, setTracks] = useState([]);
  const [playbackRate, setPlaybackRate] = useState(1);

  const defaultState = { part: null, action: null };
  
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "play":
        audio.current.currentTime = action.part.start;
        audio.current.play();
        return { part: action.part, action: action.type };
      case "loop":
        audio.current.currentTime = action.part.start;
        audio.current.play();
        return { part: action.part, action: action.type };
      case "reset":
        audio.current.pause();
        return defaultState;
      default:
        break;
    }
  }, defaultState);

  const animationFrame = useRef();
  const onAnimationFrame = () => {
    if (state.part && audio.current.currentTime >= state.part.end) {
      switch (state.action) {
        case "play":
          dispatch({ type: "reset" });
          break;
        case "loop":
          dispatch({ part: state.part, type: "loop" });
          break;
        default:
          break;
      }
    }
    animationFrame.current = requestAnimationFrame(onAnimationFrame);
  };

  useEffect(() => {
    animationFrame.current = requestAnimationFrame(onAnimationFrame);
    return () => cancelAnimationFrame(animationFrame.current);
  }, [state]);

  useEffect(() => {
    if (!src) return;
    fetch(src).then((r) => {
      r.blob().then((blob) => {
        jsmediatags.read(blob, {
          onSuccess: (metadata) => {
            setTracks(metadata.tags.comment.text.split("\n"));
          },
          onError: (error) => console.error(error),
        });
      });
    });
  }, [src]);

  useEffect(() => (audio.current.playbackRate = playbackRate), [playbackRate]);

  const handlePlaybackRateChange = (value) => {
    setPlaybackRate(parseFloat(value));
  };

  return (
    <div class="track">
      <audio
        ref={audio}
        src={src}
        controls
        controlsList="nodownload"
        onpause={() => dispatch({ type: "reset" })}
      />
      <div class="rate">
        <label for="rate">Playback Rate</label>
        <input
          id="rate"
          type="number"
          value={parseFloat(playbackRate).toFixed(2)}
          step="0.05"
          min="0.05"
          onChange={(e) => handlePlaybackRateChange(e.target.value)}
        ></input>
        <button onClick={() => handlePlaybackRateChange(0.5)}>0.50</button>
        <button onClick={() => handlePlaybackRateChange(0.75)}>0.75</button>
        <button onClick={() => handlePlaybackRateChange(1)}>1.00</button>
      </div>
      <table>
        <thead>
          <tr>
            <td>Part</td>
            <td>Time</td>
            <td style={{ width: 0 }}></td>
            <td style={{ width: 0 }}></td>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <Part
              data={track}
              index={index}
              active={state.part?.index === index}
              dispatch={dispatch}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
