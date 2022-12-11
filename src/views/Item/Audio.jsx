import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Icon } from '@mdi/react';
import {
  mdiPause,
  mdiPlayOutline,
  mdiVolumeHigh,
  mdiVolumeLow,
  mdiVolumeMedium,
  mdiVolumeOff
} from '@mdi/js';
import { Audio as className } from './Type.module.css';

export default function Audio({ media }) {
  const defaultState = {
    duration: 0,
    loaded: 0,
    played: 0,
    playing: false,
    playbackRate: 1,
    volume: 0.6,
    volumeIcon: mdiVolumeMedium
  };

  const player = useRef(null);
  const [state, _setState] = useState({ ...defaultState });

  function setState(update) {
    const object = Object.assign({}, state, update);
    _setState(object);
  }

  function formatTime(seconds) {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = ('00' + date.getUTCSeconds()).slice(-2);
    if (hh) {
      return hh + ':' + ('00' + mm).slice(-2) + 'ss';
    }
    return ('00' + mm).slice(-2) + ':' + ss;
  }

  function handleSeek(e) {
    setState({ played: parseFloat(e.target.value) });
    player.current.seekTo(parseFloat(e.target.value));
  }

  function handleVolume() {
    switch (state.volume) {
      case 1:
        setState({ volume: 0.6, volumeIcon: mdiVolumeMedium });
        break;
      case 0.6:
        setState({ volume: 0.25, volumeIcon: mdiVolumeLow });
        break;
      case 0.25:
        setState({ volume: 0, volumeIcon: mdiVolumeOff });
        break;
      default:
        setState({ volume: 1, volumeIcon: mdiVolumeHigh });
    }
  }

  function handlePlay() {
    setState({ playing: !state.playing });
  }

  function handlePlaybackRate() {
    switch (state.playbackRate) {
      case 1:
        setState({ playbackRate: 1.25 });
        break;
      case 1.25:
        setState({ playbackRate: 1.5 });
        break;
      case 1.5:
        setState({ playbackRate: 0.75 });
        break;
      default:
        setState({ playbackRate: 1 });
    }
  }

  return (
    <div className={className}>
      <ReactPlayer
        ref={player}
        url={media}
        height={0}
        width={0}
        loop={false}
        config={{ file: { forceAudio: true } }}
        duration={state.duration}
        loaded={state.loaded}
        played={state.played}
        playing={state.playing}
        playbackRate={state.playbackRate}
        volume={state.volume}
        onProgress={(state) => setState(state)}
        onDuration={(duration) => setState({ duration })}
      />
      <div className="row">
        <button onClick={handleVolume}>
          <Icon path={state.volumeIcon} size={1.25} />
        </button>
        <button onClick={handlePlay}>
          <Icon path={state.playing ? mdiPause : mdiPlayOutline} size={1.5} />
        </button>
        <button onClick={handlePlaybackRate}>{ state.playbackRate }x</button>
      </div>
      <div className="progress">
        <div>
          <span style={{ width: `${state.played*100}%` }}></span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="any"
          value={state.played || 0}
          onChange={handleSeek}
        />
      </div>
      <div className="row">
        <time>{ formatTime(state.duration * state.played) }</time>
        <time>{ formatTime(state.duration) }</time>
      </div>
    </div>
  );
}
