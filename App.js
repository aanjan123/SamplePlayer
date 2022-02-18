import React from 'react';
import Video, { TextTrackType } from 'react-native-video';

const VideoPlayer = () => {

  const playerRef = React.useRef();

  return (
    <Video
      controls
      ref={playerRef}
      onBuffer={this.onBuffer}
      onError={this.videoError}
      style={styles.backgroundVideo}
      source={require('./assets/jellies.mp4')}
      selectedTextTrack={{
        type: 'index',
        value: 0
      }}
      textTracks={[
        {
          index: 0,
          title: "English CC",
          language: "en",
          type: TextTrackType.VTT, // "text/vtt"
          uri: "https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt"
        },
        {
          index: 1,
          title: "Spanish Subtitles",
          language: "es",
          type: TextTrackType.SRT, // "application/x-subrip"
          uri: "https://durian.blender.org/wp-content/content/subtitles/sintel_es.srt"
        }
      ]}
    />
  )
}


export default VideoPlayer;

const styles = {
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
}
