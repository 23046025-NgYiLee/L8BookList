import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const AddBookScreen = ({ navigation, saveBooks, books }) => {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copies, setCopies] = useState('1');

    const handleAddBook = () => {
        if (!title.trim() || !isbn.trim()) {
            Alert.alert('Validation Error', 'Title and ISBN are required.');
            return;
        }

        if (isNaN(copies) || Number(copies) < 1) {
            Alert.alert('Validation Error', 'Copies must be a positive number.');
            return;
        }

        const newBook = {
            title: title.trim(),
            isbn: isbn.trim(),
            copies: parseInt(copies, 10),
        };

        // Check for duplicate ISBNs
        if (books.some((book) => book.isbn === newBook.isbn)) {
            Alert.alert('Error', 'A book with this ISBN already exists.');
            return;
        }

        saveBooks([...books, newBook]);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text>Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter book title"
            />
            <Text>ISBN:</Text>
            <TextInput
                style={styles.input}
                value={isbn}
                onChangeText={setIsbn}
                placeholder="Enter ISBN"
            />
            <Text>Copies:</Text>
            <TextInput
                style={styles.input}
                value={copies}
                keyboardType="numeric"
                onChangeText={(text) => setCopies(text.replace(/[^0-9]/g, ''))}
                placeholder="Enter number of copies"
            />
            <Button title="Add Book" onPress={handleAddBook} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
});

export default AddBookScreen;
