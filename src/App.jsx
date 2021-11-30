import { useState } from "preact/hooks";
import { Track } from "./Track";

export const App = () => {
  const [src, setSrc] = useState(null);

  const handleFilePick = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSrc(url);
  };

  return (
    <div>
      <h1><code>tunetrainer</code></h1>
      <input type="file" id="files" multiple onChange={handleFilePick} />
      {src && <Track src={src} />}
    </div>
  );
};
