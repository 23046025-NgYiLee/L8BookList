import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookListScreen from './BookListScreen';
import EditBookScreen from './EditBookScreen';

const Stack = createStackNavigator();

const App = () => {
  // Initialize default books
  const [books, setBooks] = useState([
    {
      title: "Atomic Habits",
      isbn: "978-0735211292",
      copies: 1,
      imageUrl: "https://m.media-amazon.com/images/I/419CqGgAdZL._SY445_SX342_.jpg",
    },
    {
      title: "How to Win Friends and Influence People",
      isbn: "978-0671027032",
      copies: 1,
      imageUrl: "https://m.media-amazon.com/images/I/71vK0WVQ4rL.jpg",
    },
  ]);

  // Function to update books
  const saveBooks = (updatedBooks) => {
    setBooks(updatedBooks);
  };

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="BookList">
            {(props) => (
                <BookListScreen {...props} books={books} saveBooks={saveBooks} />
            )}
          </Stack.Screen>
          <Stack.Screen name="EditBook">
            {(props) => (
                <EditBookScreen {...props} books={books} saveBooks={saveBooks} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
