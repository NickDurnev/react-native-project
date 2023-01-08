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
        backgroundColor: "#99E95A",
      }}
      text1Style={{
        fontSize: 20,
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
        backgroundColor: "#EF6625",
      }}
      text1Style={{
        fontSize: 20,
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
        backgroundColor: "#57DEEF",
      }}
      text1Style={{
        fontSize: 20,
        fontWeight: "400",
        textAlign: "center",
        color: "#FAFAFA",
      }}
    />
  ),
};

export default toastConfig;
