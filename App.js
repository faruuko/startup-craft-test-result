import React from 'react';
import {
  SafeAreaView,
  StatusBar as S,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal as M,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

const STATUSBAR_HEIGHT = S.currentHeight;
const ACTIVE_OPACITY = 0.7;

const item = [
  {
    day: 'Sunday',
    time: '10:00 AM - 06:00 AM',
    date: '01',
  },
  {
    day: 'Monday',
    time: '10:00 AM - 06:00 AM',
    date: '02',
  },
  {
    day: 'Tuesday',
    time: '10:00 AM - 06:00 AM',
    date: '03',
  },
  {
    day: 'Wednesday',
    time: '10:00 AM - 06:00 AM',
    date: '04',
  },
  {
    day: 'Thursday',
    time: '10:00 AM - 06:00 AM',
    date: '05',
  },
  {
    day: 'Friday',
    time: '10:00 AM - 06:00 AM',
    date: '06',
  },
  {
    day: 'Saturday',
    time: '10:00 AM - 06:00 AM',
    date: '07',
  },
  {
    day: 'Sunday',
    time: '10:00 AM - 06:00 AM',
    date: '08',
  },
  {
    day: 'Monday',
    time: '10:00 AM - 06:00 AM',
    date: '09',
  },
  {
    day: 'Tuesday',
    time: '10:00 AM - 06:00 AM',
    date: '10',
  },
  {
    day: 'Wednesday',
    time: '10:00 AM - 06:00 AM',
    date: '11',
  },
  {
    day: 'Thursday',
    time: '10:00 AM - 06:00 AM',
    date: '12',
  },
];

// Check if a number is even
const isEven = (number) => {
  if (number % 2 == 0) return true;
  else return false;
};

// Custom status bar
const StatusBar = ({ backgroundColor, barStyle }) => (
  <View style={styles.statusBar}>
    <SafeAreaView>
      <S translucent backgroundColor={backgroundColor} barStyle={barStyle} />
    </SafeAreaView>
  </View>
);

// Header
const Header = ({ title }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerBtnContainer}>
      <Image
        style={styles.headerBtn}
        source={require('./assets/arrow-left.png')}
      />
    </View>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

// Input box
const InputBox = ({ palceholder, onInputPress }) => (
  <View style={styles.inputBoxContainer}>
    <TouchableOpacity
      style={{ flexGrow: 1 }}
      activeOpacity={ACTIVE_OPACITY}
      onPress={onInputPress}
    >
      <View style={styles.inputBox}>
        <Text style={styles.inputBoxText}>{palceholder}</Text>
        <Image
          style={styles.inputBoxArrowDownImage}
          source={require('./assets/arrow-down.png')}
        />
      </View>
    </TouchableOpacity>
    <View style={styles.inputBoxBtn}>
      <Image
        style={styles.inputBoxPlusImage}
        source={require('./assets/plus-icon.png')}
      />
    </View>
  </View>
);

// Calendar
const Calendar = ({ month }) => (
  <View style={styles.calendarContainer}>
    <View style={styles.calendarControl}>
      <Image
        style={styles.calendarControlImage}
        source={require('./assets/arrow-left.png')}
      />
    </View>
    <Text style={styles.calendarMonth}>{month}</Text>
    <View style={styles.calendarControl}>
      <Image
        style={styles.calendarControlImage}
        source={require('./assets/arrow-right.png')}
      />
    </View>
  </View>
);

// List item
const ListItem = ({ data, index, showTime }) => {
  return (
    <View style={styles.listItemContainer(index)}>
      <View>
        <Text style={styles.listItemDate}>{data.date}</Text>
        <Text style={styles.listItemDay}>{data.day}</Text>
      </View>
      {showTime ? (
        <View style={styles.listItemTimeGroup}>
          <View style={styles.listItemDot} />
          <Text style={styles.listItemTime}>{data.time}</Text>
        </View>
      ) : null}
    </View>
  );
};

// Modal popup
const Modal = ({ visible, children, setVisible }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const [panY, setPanY] = React.useState(
    new Animated.Value(Dimensions.get('screen').height)
  );

  const modalOpacityValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.timing(modalOpacityValue, {
        toValue: 0.4,
        duration: 100,
        useNativeDriver: true,
      }).start();

      Animated.timing(panY, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      setTimeout(() => {
        setShowModal(false);
      }, 75);
      Animated.timing(modalOpacityValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();

      Animated.timing(panY, {
        toValue: Dimensions.get('screen').height,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  };

  const onSwipeDown = () => {
    setVisible(false);
  };

  const top = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <GestureRecognizer
      onSwipeDown={() => {
        onSwipeDown();
      }}
    >
      <M transparent visible={showModal}>
        <TouchableWithoutFeedback
          onPress={() => {
            setVisible(false);
          }}
        >
          <Animated.View
            style={[styles.modalBackground, { opacity: modalOpacityValue }]}
          ></Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View style={[{ top }]}>{children}</Animated.View>
      </M>
    </GestureRecognizer>
  );
};

const OptionItem = ({
  title,
  active,
  setVisible,
  setAvailability,
  availability,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_OPACITY}
      onPress={() => {
        setVisible(false);
        setTimeout(() => {
          setAvailability(!availability);
        }, 120);
      }}
    >
      <View style={active ? styles.optionItemActive : styles.optionItem}>
        <Text
          style={active ? styles.optionItemTextActive : styles.optionItemText}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const [availability, setAvailability] = React.useState(true);

  return (
    <View style={styles.defaultFlex}>
      <Modal visible={visible} setVisible={setVisible}>
        <SafeAreaView style={{ backgroundColor: '#FFF' }}>
          <View style={styles.modalContent}>
            <OptionItem
              title={'Availabilities'}
              active={availability ? true : false}
              setVisible={setVisible}
              setAvailability={setAvailability}
              availability={availability}
            />
            <OptionItem
              title={'Preferences'}
              active={!availability ? true : false}
              setVisible={setVisible}
              setAvailability={setAvailability}
              availability={availability}
            />

            <View style={styles.hr} />

            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <StatusBar backgroundColor={'#f58961'} barStyle={'light-content'} />
      <View style={styles.defaultFlex}>
        {/* Header */}
        <Header title={'Availabilities'} />

        {/* Input box */}
        <InputBox
          onInputPress={() => {
            setVisible(true);
          }}
          palceholder={availability ? 'Availabilities' : 'Preferences'}
        />

        {/* Calendar */}
        <Calendar month={'March 2020'} />

        {/* List */}
        <FlatList
          data={item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ListItem index={index} data={item} showTime={availability} />
          )}
          keyExtractor={(item) => item.date}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  defaultFlex: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#f58961',
  },
  headerContainer: {
    backgroundColor: '#f58961',
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#FFF',
    flexGrow: 1,
    paddingRight: 30,
  },
  headerBtnContainer: {
    backgroundColor: '#f9b9a1',
    height: 30,
    width: 30,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBtn: {
    height: 12,
    width: 6,
  },
  inputBoxContainer: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  inputBox: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 6,
    borderColor: '#e3e6e8',
    flexGrow: 1,
  },
  inputBoxText: {
    fontSize: 15,
    opacity: 0.8,
    letterSpacing: 0.32,
  },
  inputBoxBtn: {
    backgroundColor: '#f9b9a1',
    height: 40,
    width: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  inputBoxPlusImage: {
    width: 15,
    height: 15,
  },
  inputBoxArrowDownImage: {
    width: 14,
    height: 7,
  },
  calendarContainer: {
    backgroundColor: '#faf7fb',
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarControl: {
    backgroundColor: '#f9b9a1',
    height: 28,
    width: 28,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarControlImage: {
    height: 11,
    width: 5.5,
  },
  calendarMonth: {
    fontSize: 17,
  },
  listItemContainer: (index) => ({
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: isEven(index) ? '#FFFFFF' : '#faf7fb',
  }),
  listItemDate: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  listItemDay: {
    fontSize: 17,
    opacity: 0.5,
  },
  listItemTimeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemDot: {
    height: 10,
    width: 10,
    backgroundColor: 'brown',
    borderRadius: 10,
    marginRight: 10,
  },
  listItemTime: {
    fontSize: 15,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    padding: 25,
    backgroundColor: '#FFF',
  },
  cancelText: {
    color: '#f9b9a1',
    fontSize: 17,
    letterSpacing: 0.32,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  optionItemActive: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#f9b9a1',
    borderRadius: 50,
  },
  optionItemText: {
    color: '#000',
    fontSize: 16,
    letterSpacing: 0.32,
  },
  optionItemTextActive: {
    color: '#FFF',
    fontSize: 16,
    letterSpacing: 0.32,
  },
  hr: {
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});
