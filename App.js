import React from 'react';
import { View, Text } from 'react-native';
import Video, { TextTrackType } from 'react-native-video';
import InteractiveTranscripts from 'react-native-interactive-transcripts';

const TestPlayer = () => {

  const playerRef = React.useRef();
  const [duration, setDuration] = React.useState(0);

  const _onProgress = (progress) =>
    setDuration(progress.currentTime * 1000);

  const _onSeekToTranscript = (time) =>
    playerRef.current?.seek(time);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Video
          controls
          ref={playerRef}
          onProgress={_onProgress}
          style={styles.backgroundVideo}
          source={require('./video.mp4')}
          selectedTextTrack={{
            type: 'index',
            value: 0
          }}
          textTracks={[
            {
              index: 0,
              language: 'en',
              title: 'English CC',
              type: TextTrackType.VTT,
              uri: 'https://html5multimedia.com/code/ch8/elephants-dream-subtitles-en.vtt'
            }
          ]}
        />
      </View>

      <View style={styles.container}>
        <InteractiveTranscripts
          currentDuration={duration}
          url={
            'https://html5multimedia.com/code/ch8/elephants-dream-subtitles-en.vtt'
          }
          activeTranscriptColor={'blue'}
          seekToTranscriptDuration={_onSeekToTranscript}
        />
      </View>
    </View>
  )
}


export default TestPlayer;

const styles = {
  container: {
    flex: 1
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
}
