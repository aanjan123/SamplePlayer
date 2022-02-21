import React from 'react';
import { View, Text, Platform } from 'react-native';
import Video, { TextTrackType } from 'react-native-video';
import InteractiveTranscripts from 'react-native-interactive-transcripts';

const VIDEO_URL = `https://videodelivery.net/8ed7a050e2183c88229d5ccd76510963/manifest/video.m3u8`;
const SRT_URL = 'https://all-subtitle-files.s3.eu-north-1.amazonaws.com/nepali_reviewed/20220117_45_ne.srt';

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
          source={{ uri: VIDEO_URL }}
          resizeMode={
            'cover'
          }
          selectedTextTrack={{
            type: 'index',
            value: 0
          }}
          textTracks={Platform.OS === 'android' ? [
            {
              index: 0,
              language: 'en',
              title: 'English CC',
              type: TextTrackType.SRT,
              uri: SRT_URL
            }
          ] : []}
        />
      </View>

      <View style={styles.container}>
        <InteractiveTranscripts
          currentDuration={duration}
          url={
            SRT_URL
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
