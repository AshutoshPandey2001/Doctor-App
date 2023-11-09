import { StyleSheet, Platform } from "react-native"

export const GlobalStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 999,
        height: '100%',
        width: '100%',
        margin: 'auto',
        backgroundColor: "rgba(255,255,255,0.7)",
        elevation: Platform.OS === "android" ? 50 : 0,
        shadowColor: "rgba(255,255,255,0.7)"
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        padding: 5
    },
    btn: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 20,
        alignItems: 'center'
    },

    card: {
        flexDirection: 'row',
        backgroundColor: 'white', // Background color of the card
        borderRadius: 10, // Increase the border radius for a smoother look
        padding: 10,
        marginBottom: 15,
        zIndex: 0,
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 3 }, // Offset of the shadow
        shadowOpacity: 0.3, // Opacity of the shadow
        shadowRadius: 5, // Spread of the shadow
        elevation: 5, // Elevation for Android (keep this line for Android)
    },

    leftSide: {
        flex: 3,
        marginRight: 10,
        borderRightWidth: 1,
        borderColor: 'black',
        paddingRight: 10,
    },
    middleSide: {
        flex: 6,
    },
    textcolor: {
        fontSize: 14,
        color: 'gray'
    },
    rightSide: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: 'gray',
        fontWeight: 'bold',
    },
    actionsPopup: {
        position: 'absolute',
        top: 80,
        left: '10%',
        transform: [{ translateX: -70 }, { translateY: -50 }],
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 10,
        display: 'flex',
        flexDirection: 'column',
        width: 100,
        height: 'auto',
        zIndex: 999,
        overflow: 'visible',
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 3 }, // Offset of the shadow
        shadowOpacity: 0.3, // Opacity of the shadow
        shadowRadius: 5, // Spread of the shadow
    },
})
