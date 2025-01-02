import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const EditBookScreen = ({ route, navigation, books, saveBooks }) => {
    const { book } = route.params || {};
    const [title, setTitle] = useState(book?.title || '');
    const [isbn, setIsbn] = useState(book?.isbn || '');
    const [copies, setCopies] = useState(book?.copies?.toString() || '1');
    const [imageUrl, setImageUrl] = useState(book?.imageUrl || '');

    const handleSave = () => {
        if (!title || !isbn) {
            alert('Title and ISBN are required!');
            return;
        }

        const updatedBooks = book
            ? books.map((b) =>
                b.isbn === book.isbn
                    ? { ...b, title, isbn, copies: parseInt(copies, 10), imageUrl }
                    : b
            )
            : [...books, { title, isbn, copies: parseInt(copies, 10), imageUrl }];

        saveBooks(updatedBooks);
        navigation.goBack();
    };

    const handleDelete = () => {
        if (!book) {
            alert('Cannot delete a new book that has not been saved yet.');
            return;
        }

        const updatedBooks = books.filter((b) => b.isbn !== book.isbn);
        saveBooks(updatedBooks);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="ISBN"
                value={isbn}
                onChangeText={setIsbn}
            />
            <TextInput
                style={styles.input}
                placeholder="Number of Copies"
                keyboardType="numeric"
                value={copies}
                onChangeText={setCopies}
            />
            <TextInput
                style={styles.input}
                placeholder="Image URL"
                value={imageUrl}
                onChangeText={setImageUrl}
            />
            <Button title="Save" onPress={handleSave} />
            {book && <Button title="Delete" color="red" onPress={handleDelete} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 5,
    },
});

export default EditBookScreen;
