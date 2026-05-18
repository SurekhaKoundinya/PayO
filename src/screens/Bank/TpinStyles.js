const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f3e8ff",
    justifyContent: "space-between",
    paddingVertical: 40,
  },

  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#6a0dad",
  },

  subtitle: {
    textAlign: "center",
    marginTop: 5,
    color: "#666",
  },

  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },

  dot: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#6a0dad",
    marginHorizontal: 10,
  },

  dotFilled: {
    backgroundColor: "#6a0dad",
  },

  numpad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 40,
  },

  key: {
    width: "30%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },

  keyText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },

  button: {
    marginHorizontal: 20,
    backgroundColor: "#7b1fa2",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default styles;