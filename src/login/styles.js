export default {
    baseTextStyle: {
        fontSize: "3vh",
        fontFamily: "Helvetica-Light", 
    },
    container: {
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100vw"
    },
    formContainer: {
        padding: "30px 60px 30px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    mainBox: {
        height: "50vh",
        width: "30vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    welcomeContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        marginBottom: "5vh"
    },
    welcome: {
        color: "rgb(38, 27, 91)",
        fontSize: "11vh",
        fontFamily: "roboto", 
        fontWeight: "100",
        paddingLeft: "10px",
        margin: "0px"
    },
    image: {
        width: "60px",
        height: "auto"
    },
    background:{
        height: "100vh",
        position: 'absolute',
        zIndex: "-1",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        overflow: 'hidden',
        filter: 'blur(12px)',
        opacity: '1',
        width: '100vw'
    },
    input: {
        height: "40px",
        fontSize: "24px",
        borderRadius: "6px",
        border: "2px solid rgba(230, 230, 230, 0.5)",
        opacity: "0.8",
        background: "transparent",
        zIndex: "1",
        paddingLeft: "6px"
    },
    submitButton: {
        borderRadius: "6px",
        backgroundColor: "rgba(250, 250, 250, 1)"
    },
    submitLabel: {
        // height: "40px",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        color: "rgb(38, 27, 91)",
        fontSize: "24px",
        display: "flex",
        justifyContent: "center",
        borderRadius: "6px",
    },
    loadingBackground: {
        height: "100vh",
        position: 'absolute',
        zIndex: "99",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        overflow: 'hidden',
        filter: 'blur(12px)',
        width: '100vw'
    },
    loading: {
        fontSize: "10vh",
        zIndex: "100",
        opacity: '.6',
    },
};
