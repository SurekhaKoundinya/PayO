import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f3e8ff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#6a0dad",
    marginTop: 40,
  },

  subtitle: {
    textAlign: "center",
    marginTop: 15,
    color: "#666",
    fontSize: 16,
  },

  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 50,
  },

  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#6a0dad",
    marginHorizontal: 15,
  },

  dotFilled: {
    backgroundColor: "#6a0dad",
  },

  // NUMPAD
  numpad: {
    alignItems: "center",
    marginTop: 30,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
  },

  key: {
    width: width * 0.24,
    height: width * 0.24,
    minWidth: 60,
    minHeight: 60,
    maxWidth: 80,
    maxHeight: 80,
    margin: 8,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  keyEmpty: {
    width: width * 0.24,
    height: width * 0.24,
    minWidth: 60,
    minHeight: 60,
    maxWidth: 80,
    maxHeight: 80,
    margin: 8,
  },

  keyText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },

  button: {
    backgroundColor: "#7b1fa2",
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
};

export default styles;