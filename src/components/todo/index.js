import React, {useState} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import {colors} from '../../utils/constants';
import EditModal from '../editModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Todo = ({todo = {}, todos = [], setTodos = () => {}}) => {
  const [openModel, setOpenModel] = useState(false);
  const [willEditText, setWillEditText] = useState(todo.text);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const deleteTodo = () => {
    Alert.alert(
      'Silme İşlemi',
      `${todo?.id} numaralı todo'yu silmek istediğinize emin misiniz?`,
      [
        {
          text: 'Vazgeç',
        },
        {
          text: 'Sil',
          onPress: () => {
            const filteredTodos = todos.filter(item => item.id !== todo.id);
            AsyncStorage.setItem('@todos', JSON.stringify(filteredTodos)).then(
              () => setTodos(filteredTodos),
            );
          },
          style: 'destructive',
        },
      ],
    );
  };

  const changeComplated = () => {
    Alert.alert(
      'Yapıldı',
      'Görev yapıldı olarak değiştirilecek. Emin misiniz?',
      [
        {
          text: 'Vazgeç',
        },
        {
          text: 'İşaretle',
          onPress: () => {
            const tempArr = [];
            for (let i = 0; i < todos.length; i++) {
              if (todos[i].id !== todo.id) {
                tempArr.push(todos[i]);
              } else {
                const newTodo = {
                  ...todo,
                  complated: !todo.complated,
                };
                tempArr.push(newTodo);
              }
            }
            AsyncStorage.setItem('@todos', JSON.stringify(tempArr)).then(() =>
              setTodos(tempArr),
            );
          },
          style: 'destructive',
        },
      ],
    );
  };
  const editTodo = () => {
    if (willEditText === '') {
      setHasError(true);
      setErrorMessage('*Text alanı boş bırakılamaz...');
      setTimeout(() => {
        setHasError(false);
        setErrorMessage('');
      }, 2000);
      return;
    }

    const tempArr = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id !== todo.id) {
        tempArr.push(todos[i]);
      } else {
        const updateTodo = {
          ...todos,
          text: willEditText,
        };
        tempArr.push(updateTodo);
      }
    }
    AsyncStorage.setItem('@todos', JSON.stringify(tempArr)).then(() => {
      setTodos(tempArr);
      setOpenModel(false);
    });
  };
  return (
    <View style={styles.todoWrapper}>
      <View style={styles.textWrapper}>
        <Text style={[styles.title, todo?.complated && styles.complatedTitle]}>
          {todo?.text}
        </Text>
        <Text style={styles.date}>
          {new Date(todo?.date).toLocaleDateString('tr-TR')}
        </Text>
      </View>
      <View style={styles.iconsWrapper}>
        <TouchableOpacity onPress={changeComplated}>
          <Icon
            name={todo?.complated === true ? 'checkcircle' : 'checkcircleo'}
            size={25}
            color={colors.green}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOpenModel(true)}>
          <Icon name="edit" size={25} color={colors.bgPrimary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteTodo}>
          <Icon name="closecircle" size={25} color={colors.danger} />
        </TouchableOpacity>
      </View>
      <EditModal
        willEditText={willEditText}
        setWillEditText={setWillEditText}
        visible={openModel}
        closeModal={() => setOpenModel(false)}
        onConfirm={editTodo}
        hasError={hasError}
        errorMessage={errorMessage}
      />
    </View>
  );
};

export default Todo;
