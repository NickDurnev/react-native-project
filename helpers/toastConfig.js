import { BaseToast, ErrorToast } from "react-native-toast-message";

/*
  1. Create the config
*/
const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderRadius: 5,
        borderLeftColor: "#99E95A",
        backgroundColor: "#99E95A",
      }}
      text1Style={{
        width: "80%",
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        color: "#FAFAFA",
      }}
      text2Style={{
        width: "80%",
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        color: "#FAFAFA",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderRadius: 5,
        borderLeftColor: "#EF6625",
        backgroundColor: "#EF6625",
        height: 50,
        overflow: "visible",
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        color: "#FAFAFA",
      }}
      text2Style={{
        width: "80%",
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        color: "#FAFAFA",
      }}
    />
  ),

  info: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderRadius: 5,
        borderLeftColor: "#57DEEF",
        backgroundColor: "#57DEEF",
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        color: "#FAFAFA",
      }}
      text2Style={{
        width: "80%",
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        color: "#FAFAFA",
      }}
    />
  ),
};

export default toastConfig;
