import React from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';
import VideoPlayer from './react-native-video-controls-subtitle';

const VIDEO_URL = `https://videodelivery.net/8ed7a050e2183c88229d5ccd76510963/manifest/video.m3u8`;
const STR_URL = `https://all-subtitle-files.s3.eu-north-1.amazonaws.com/nepali_reviewed/20220117_45_ne.srt`;

const TestPlayer = () => {

  const [duration, setDuration] = React.useState(0);
  const [strJson, setStrJson] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedIndex, changeSelectedIndex] = React.useState(0);


  const _onProgress = (progress) => {
    let newDuration = progress.currentTime * 1000;
    let cueval = cueTextAndIndex(strJson, newDuration);
    changeSelectedIndex(cueval.cueindex);
    setDuration(newDuration);
  }

  const _onSeekToTranscript = (time) => () => true

  React.useEffect(() => {
    _getSrt();
  }, []);

  const _getSrt = async () => {
    try {
      setLoading(true);
      const response = await fetch(STR_URL);
      const string = await response.text();
      const json = _strParser(string);
      setStrJson(json);
      setLoading(false);
    } catch (err) {
      setStrJson([]);
      setLoading(false);
    }
  }

  const _strParser = (text) => {

    const Subtitle = text;
    const Pattern = /(\d+)\n([\d:,]+)\s+-{2}\>\s+([\d:,]+)\n([\s\S]*?(?=\n{2}|$))/g;
    const result = [];

    if (typeof (text) != "string") throw "Sorry, Parser accept string only.";
    if (Subtitle === null) return Subtitle;

    const Parse = Subtitle.replace(/\r\n|\r|\n/g, '\n');
    let Matches;

    while ((Matches = Pattern.exec(Parse)) != null) {

      result.push({
        Line: Matches[1],
        startTime: Matches[2],
        endTime: Matches[3],
        text: Matches[4],
      })

    }

    return result;

  }

  const cueTextAndIndex = (array, value) => {
    let low = 0,
      high = array.length - 1;
    while (low < high) {
      var mid = (low + high) >>> 1;
      if (array[mid].startTime <= value) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    low = low - 1;
    if (low < 0) {
      return { cuetext: '', cueindex: -1 };
    }
    return {
      cuetext: array[low].endTime >= value ? array[low].text : '',
      cueindex: array[low].endTime >= value ? array[low].sequence : -1,
    };
  };


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size={'large'}
          color={'red'}
        />
      </View>
    )
  }


  return (
    <View style={styles.container}>

      <View style={styles.container}>

        <VideoPlayer
          disableBack
          disableVolume
          subtitle={strJson}
          style={{ flex: 1 }}
          onProgress={_onProgress}
          source={{ uri: VIDEO_URL }}
        />

      </View>

      <View style={styles.container}>
        <FlatList
          data={strJson}
          keyExtractor={(item, id) => JSON.stringify(id)}
          renderItem={({ item, index }) =>
            <Pressable
              onPress={_onSeekToTranscript(item)}
              style={{ paddingHorizontal: 10, marginVertical: 5, backgroundColor: selectedIndex === index ? 'blue' : 'white' }}
            >
              <Text style={{ color: 'black' }}>{item.text}</Text>
            </Pressable>
          }
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
