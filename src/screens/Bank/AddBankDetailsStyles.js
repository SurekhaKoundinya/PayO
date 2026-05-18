const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: "#f3e8ff",
    padding: 20,
  },

    header: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: {
    position: 'absolute',
    left: 0,
  },

  back: {
    fontSize: 24,
    color: '#4B0082',
  },

  card: {
    width: "100%",
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    elevation: 5,
  },

  title: {
    textAlign: "center",
    color: "#6a0dad",
    marginBottom: 15, // 🔽 reduced
    fontSize: 20,
    fontWeight: "bold",
  },

  sectionTitle: {
    color: "#6a0dad",
    fontWeight: "bold",
    marginTop: 10,   // 🔽 reduced
    marginBottom: 5, // 🔽 reduced
    fontSize: 14,
  },

  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10, // 🔽 reduced (key fix)
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1c4e9",
    fontSize: 14,
    backgroundColor: "#fafafa",
  },

  // ✅ DROPDOWN INPUT
  dropdownInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1c4e9",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12, // 🔽 slightly reduced
    marginBottom: 10,    // 🔽 reduced
    backgroundColor: "#fff",
  },

  bankIcon: {
    fontSize: 16,
    marginRight: 10,
  },

  dropdownText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },

  dropdownArrow: {
    fontSize: 16,
    color: "#777",
  },

  // ✅ DROPDOWN LIST
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1c4e9",
    borderRadius: 12,
    maxHeight: 160,
    marginBottom: 10, // 🔽 reduced
    overflow: "hidden",
  },

  dropdownItem: {
    padding: 12, // 🔽 reduced
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  // ✅ RADIO BUTTON
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6, // 🔽 reduced
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  radioOuterActive: {
    borderColor: "#7b1fa2",
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#7b1fa2",
  },

  radioText: {
    fontSize: 15,
    color: "#333",
  },

  button: {
    width: "100%",
    padding: 14,
    backgroundColor: "#7b1fa2",
    borderRadius: 12,
    marginTop: 12, // 🔽 reduced
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default styles;