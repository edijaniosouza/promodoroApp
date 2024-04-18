import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


type SetupDialogProps = {
    modalVisible: boolean,
    onPress: () => any,
    shortBreakTime: string,
    setShortBreakTime: (time: string) => any,
    longBreakTime: string,
    setLongBreakTime: (time: string) => any,
    focusTime: string,
    setFocusTime: (time: string) => any,
}
const SetupDialog: React.FC<SetupDialogProps> = ({ modalVisible, onPress, shortBreakTime, setShortBreakTime,longBreakTime,setLongBreakTime, focusTime, setFocusTime }) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onDismiss={() => { console.log("saindo...") }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Configurar</Text>
                    <TextInput
                        placeholder='Tempo em foco (minutos)'
                        onChangeText={(text) => setFocusTime(text)}
                        defaultValue={focusTime}
                        style={styles.textInput}
                        keyboardType="decimal-pad"
                    />
                    <TextInput
                        placeholder='Tempo pausa rapida (minutos)'
                        onChangeText={(text) => setShortBreakTime(text)}
                        defaultValue={shortBreakTime}
                        style={styles.textInput}
                        keyboardType="decimal-pad"
                    />
                    <TextInput
                        placeholder='Tempo pausa longa (minutos)'
                        onChangeText={(text) => setLongBreakTime(text)}
                        defaultValue={longBreakTime}
                        style={styles.textInput}
                        keyboardType="decimal-pad"
                    />

                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={onPress} style={styles.btn}>
                            <Text style={{ color: "black" }}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPress} style={[styles.btn, styles.btnConfirmColor]}>
                            <Text style={{ color: "white" }}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    textInput: {
        margin: 2,
        padding: 10,
        borderWidth: 1,
        width: 200,
        fontSize: 12,
        textAlign: "center"
    },
    btnContainer: {
        flexDirection: "row",
        marginTop: 15,
        gap: 5
    },
    btn: {
        borderRadius: 5,
        padding: 10,
    },
    btnConfirmColor: {
        backgroundColor: "red",
    }
});


export default SetupDialog