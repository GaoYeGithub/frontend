import React, { useState } from 'react';
import { Container, Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogContent, DialogActions } from '@mui/material';
import { AddCircleOutlineRounded, DeleteOutlineRounded, Edit } from '@mui/icons-material';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editTodoIndex, setEditTodoIndex] = useState(null);

  const handleAddTodo = () => {
    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEditTodo = () => {
    const newTodos = todos.map((todo, i) =>
      i === editTodoIndex ? inputValue : todo
    );
    setTodos(newTodos);
    setEditDialogOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <TextField
        label="New Todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
      />
      <Button
        startIcon={<AddCircleOutlineRounded />}
        onClick={handleAddTodo}
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: '20px' }}
      >
        Add Todo
      </Button>
      <List>
        {todos.map((todo, index) => (
          <ListItem key={index}>
            <ListItemText primary={todo} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => {
                  setEditTodoIndex(index);
                  setInputValue(todo);
                  setEditDialogOpen(true);
                }}
              >
                <Edit />
              </IconButton>
              <IconButton edge="end" color="secondary" onClick={() => handleDeleteTodo(index)}>
                <DeleteOutlineRounded />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogContent>
          <TextField
            label="Edit Todo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditTodo} color="primary">
            Save
          </Button>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
