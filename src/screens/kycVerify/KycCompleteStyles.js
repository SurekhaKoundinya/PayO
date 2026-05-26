import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#120022',
  },

  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 20,
    backgroundColor: '#120022',
    alignItems: 'center',
  },

  header: {
    width: '100%',
    marginBottom: 40,
  },

  iconWrapper: {
    marginTop: 40,
    alignItems: 'center',
  },

  successCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#00FFD1',
    fontSize: 34,
    fontWeight: '600',
    marginTop: 40,
    textAlign: 'center',
  },

  subTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 26,
    marginTop: 30,
    opacity: 0.9,
    paddingHorizontal: 10,
  },

  homeBtn: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 80,
  },

  homeBtnText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },

  backBtn: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 24,
  },

  backBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default styles;