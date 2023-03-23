import React, { useState } from "react";
import "./index.css";
import cn from "clsx";

export default function Audio() {
  const [audio, setAudio] = useState(false);
  const changeAudio = () => {
    setAudio(!audio);
  };
  return (
    <div class={cn("playing")} onClick={() => changeAudio()}>
      <span
        className={cn(
          audio ? "playing__bar muted" : "playing__bar playing__bar1",
        )}
      ></span>
      <span
        className={cn(
          audio ? "playing__bar muted" : "playing__bar playing__bar2",
        )}
      ></span>
      <span
        className={cn(
          audio ? "playing__bar muted" : "playing__bar playing__bar3",
        )}
      ></span>
      <span
        className={cn(
          audio ? "playing__bar muted" : "playing__bar playing__bar4",
        )}
      ></span>
      <span
        className={cn(
          audio ? "playing__bar muted" : "playing__bar playing__bar5",
        )}
      ></span>
    </div>
  );
}
