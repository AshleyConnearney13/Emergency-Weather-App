import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const PersonalReminders = () => {
  const [item, setItem] = useState('');
  const [list, setList] = useState([]);

  const handleAddItem = () => {
    setList([...list, item]);
    setItem('');
  };
  const handleRemoveItem = () => {
    setList([]);
    setItem('');
  };

  return (
    <View style={styles.container}>
         {list.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
      <TextInput
        style={styles.input}
        value={item}
        onChangeText={text => setItem(text)}
        placeholder="Add an item"
      />
      <Button
        title="Add"
        onPress={handleAddItem}
      />
          <Button
        title="Clear"
        onPress={handleRemoveItem}
      />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    width: '80%',
  },
});

export default PersonalReminders;