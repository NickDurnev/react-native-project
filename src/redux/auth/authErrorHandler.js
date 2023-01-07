const authErrorHandler = (errorCode) => {
  if (errorCode === "auth/invalid-email") {
    return "Your email is invalid";
  }
  if (errorCode === "auth/wrong-password") {
    return "Your password is wrong";
  }
  if (errorCode === "auth/weak-password") {
    return "Password should be at least 6 characters";
  }
  if (errorCode === "auth/email-already-in-use") {
    return "This email is already in use";
  }
};

export default authErrorHandler;
