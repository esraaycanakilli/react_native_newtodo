import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';

import Header from './src/components/header';
import Input from './src/components/input';
import generalStyles from './src/utils/generalStyles';
import {colors} from './src/utils/constants';
import Todo from './src/components/todo';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const addTodo = () => {
    const newTodo = {
      id: String(new Date().getTime()),
      text: text,
      date: new Date(),
      complated: false,
    };

    AsyncStorage.setItem('@todos', JSON.stringify([...todos, newTodo]))
      .then(() => {
        setTodos([...todos, newTodo]);
        setText('');
      })
      .catch(err => {
        Alert.alert('Hata', 'Kayıt esnasında bir hata oluştu');
      });
  };
  
  useEffect(() => {
    AsyncStorage.getItem('@todos').then(res => {
      if (res !== null) {
        const parsedRes = JSON.parse(res);
        setTodos(parsedRes);
      }
    });
  }, []);

  return (
    <SafeAreaView style={[generalStyles.flex1, generalStyles.bgWhite]}>
      <Header title="My Todo App" />
      <Input
        value={text}
        onChangeText={text => setText(text)}
        placeholder="Deneme Yazısı"
        hasIcon={true}
        onIconPress={addTodo}
      />
      <View style={styles.todosWrapper}>
        {todos.length === 0 ? (
          <Text style={styles.emptyText}>Henüz Kayıt Girilmemiş</Text>
        ) : (
          <ScrollView style={styles.scrollView}>
            {todos?.map(todo => (
              <Todo
                key={todo?.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  todosWrapper: {
    flex: 1,
    margin: 20,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default App;
