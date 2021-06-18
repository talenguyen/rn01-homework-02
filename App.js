/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    completed: true,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    completed: false,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    completed: false,
  },
];

const Item = ({text, completed, onCheckPress, onDeletePress}) => {
  const checkIcon = completed
    ? require('./src/assets/images/checked.png')
    : require('./src/assets/images/unchecked.png');
  const textStyle = completed ? styles.todoTextCompleted : styles.todoText;
  return (
    <View style={styles.item}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={onCheckPress}>
          <View style={styles.checkButton}>
            <Image style={styles.icon} source={checkIcon} />
          </View>
        </TouchableOpacity>
        <Text style={textStyle}>{text}</Text>
      </View>
      <TouchableOpacity onPress={onDeletePress}>
        <View style={styles.checkButton}>
          <Image
            style={styles.icon}
            source={require('./src/assets/images/clear.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  const addTask = () => {
    if (text.length === 0) {
      return;
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        task: text,
        completed: false,
      },
    ]);
    setText('');
  };

  const toggle = id => {
    setTasks(
      tasks.map(item => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }

        return item;
      }),
    );
  };

  const renderItem = ({item}) => {
    return (
      <Item
        text={item.task}
        completed={item.completed}
        onCheckPress={() => toggle(item.id)}
        onDeletePress={() => console.log('delete pressed')}
      />
    );
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="I will..."
          onChangeText={value => setText(value)}
          defaultValue={text}
        />
        <TouchableOpacity onPress={addTask}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  highlight: {
    fontWeight: '700',
  },
  item: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  checkButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  todoText: {
    fontSize: 18,
    fontWeight: '300',
    paddingHorizontal: 8,
  },
  todoTextCompleted: {
    fontSize: 18,
    fontWeight: '300',
    paddingHorizontal: 8,
    opacity: 0.5,
    textDecorationLine: 'line-through',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    backgroundColor: '#FFF',
    width: 240,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});

export default App;
