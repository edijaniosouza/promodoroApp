import { useRef, useState, useEffect } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Timer } from 'react-native-stopwatch-timer'
import { Audio, InterruptionModeAndroid } from 'expo-av';
import * as Notifications from 'expo-notifications'
import SetupDialog from './components/SetupDialog';
import { Sound } from 'expo-av/build/Audio';

export default function App() {
  const [focusTime, setFocusTime] = useState<number>(5000)
  const [shortBreakTime, setshortBreakTime] = useState<number>(300000)
  const valueToCalc = 60000
  const shortBreakInMinutes = shortBreakTime / valueToCalc
  const [longBreakTime, setlongBreakTime] = useState<number>(900000)
  const [isTimeStarted, setIsTimeStarted] = useState<boolean>(false)
  const [resetTimer, setResetTimer] = useState<boolean>(false)
  const [timerState, setTimerState] = useState(0)
  const [duration, setDuration] = useState<number>(focusTime)
  const [stateName, setStateName] = useState("FOCO")
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  async function registerForPushNotificationAsync() {
    let token
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus


    Notifications.usePermissions()
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      alert("Falha ao permitir notificações")
      return
    }

    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  }

  useEffect(() => {
    switch (timerState) {
      case 0:
        setDuration(focusTime)
        setStateName("FOCO")
        break;
      case 1:
        setDuration(shortBreakTime)
        setStateName("DESCANSO RAPIDO")
        break;
      case 2:
        setDuration(focusTime)
        setStateName("FOCO")
        break;
      case 3:
        setDuration(shortBreakTime)
        setStateName("DESCANSO RAPIDO")
        break;
      case 4:
        setDuration(focusTime)
        setStateName("FOCO")
        break;
      case 5:
        setDuration(shortBreakTime)
        setStateName("DESCANSO RAPIDO")
        break;
      case 6:
        setDuration(focusTime)
        setStateName("FOCO")
        break;
      case 7:
        setDuration(longBreakTime)
        setStateName("DESCANSO LONGO")
        break;
      default:
        break;
    }
  }, [timerState])

  // useEffect(()=>{
  //   registerForPushNotificationAsync()
  // }, [])

  const [sound, setSound] = useState<any>();
  async function playSound() {

    // const status = await soundInUse.getStatusAsync()

    // if(status.isPlaying){
    //   await soundInUse.pauseAsync()
    //   return
    // }
    const audio = Audio
    audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
    })
    const { sound } = await audio.Sound.createAsync(require('./assets/mixkit-scanning-sci-fi-alarm-905.wav')
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <SetupDialog modalVisible={modalVisible} onPress={() => setModalVisible(!modalVisible)}
        focusTime={focusTime.toString()}
        setFocusTime={(time) => setFocusTime(parseInt(time))}
        longBreakTime={longBreakTime.toString()}
        setLongBreakTime={(time) => setlongBreakTime(parseInt(time))}
        shortBreakTime={shortBreakTime.toString()}
        setShortBreakTime={(time) => setshortBreakTime(parseInt(time))}
      />

      <TouchableHighlight style={isTimeStarted ? [styles.circle] : [styles.circle, { backgroundColor: '#004000' }]} onPress={() => {
        setIsTimeStarted(!isTimeStarted);
      }
      }
        onLongPress={() => { setModalVisible(!modalVisible) }}
      >
        <View style={styles.circleInside}>
          <Text style={styles.textStart}>{isTimeStarted ? "PARAR" : "INICIAR"}</Text>
          <Text style={styles.textDescription}>{stateName}</Text>

          <Timer
            totalDuration={duration}
            start={isTimeStarted}
            reset={true}
            options={timerOptions}
            handleFinish={() => {
              setResetTimer(true)
              setIsTimeStarted(false)
              timerState >= 7 ? setTimerState(0) : setTimerState(timerState + 1)
              playSound()
            }}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circle: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    height: 300,
    width: 300,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 150,
    backgroundColor: "#800000",
  },
  circleInside: {
    backgroundColor: "#211",
    height: 290,
    width: 290,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 150,
    justifyContent: "center",
    alignItems: "center"
  },
  textStart: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
  },
  textDescription: {
    fontSize: 20,
    color: "#FFF",
  },

});

const timerOptions = {
  text: {
    marginTop: 30,
    fontSize: 30,
    color: "#FFF"
  }
}


