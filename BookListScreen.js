import React from 'react';
import { FlatList, Button, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const BookListScreen = ({ books = [], saveBooks, navigation }) => {
    // Handle adding a new book
    const handleAddBook = () => {
        navigation.navigate("EditBook", { book: null, saveBooks });
    };

    // Handle editing a book
    const handleEditBook = (book) => {
        navigation.navigate("EditBook", { book, saveBooks });
    };

    return (
        <View style={styles.container}>
            <Button title="Add New Book" onPress={handleAddBook} />
            <FlatList
                data={books}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleEditBook(item)}>
                        <View style={styles.itemContainer}>
                            <Image source={{ uri: item.imageUrl }} style={styles.bookImage} />
                            <View style={styles.textContainer}>
                                <Text style={styles.bookTitle}>{item.title}</Text>
                                <Text>ISBN: {item.isbn}</Text>
                                <Text>Copies: {item.copies}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.isbn}
                ListEmptyComponent={<Text style={styles.emptyText}>No books available</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    bookImage: {
        width: 50,
        height: 75,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
});

export default BookListScreen;
