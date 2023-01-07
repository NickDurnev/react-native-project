import { BaseToast, ErrorToast } from "react-native-toast-message";

/*
  1. Create the config
*/
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderWidth: 5,
        borderLeftColor: "#A0E46D",
        borderColor: "#A0E46D",
      }}
      text1Style={{
        fontSize: 20,
        fontWeight: "400",
        textAlign: "center",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderWidth: 5,
        borderLeftColor: "#F68F6D",
        borderColor: "#F68F6D",
      }}
      text1Style={{
        fontSize: 20,
        fontWeight: "400",
        textAlign: "center",
      }}
    />
  ),
};

export default toastConfig;
