import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { fetchTasks, addTask, updateTask, deleteAllTasks } from "./utils/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const toast = useToast();

  useEffect(() => {
    async function loadTasks() {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    }
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTaskName.trim() === "") return;
    const task = await addTask({ name: newTaskName });
    setTasks([...tasks, task]);
    setNewTaskName("");
    toast({
      title: "Task added successfully",
      status: "success",
      duration: 2000,
    });
  };

  const handleUpdateTask = async (id, updates) => {
    const updatedTask = await updateTask(id, updates);
    setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
  };

  const handleDeleteAllTasks = async () => {
    await deleteAllTasks();
    setTasks([]);
    toast({ title: "All tasks deleted", status: "warning", duration: 2000 });
  };

  return (
    <ChakraProvider>
      <Box p={5}>
        <VStack spacing={4}>
          <HStack>
            <Input
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Enter task name"
              onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
            />
            <Button onClick={handleAddTask} colorScheme="blue">
              Add
            </Button>
          </HStack>
          {tasks.map((task) => (
            <HStack key={task._id} w="100%" justify="space-between">
              <HStack>
                <IconButton
                  icon={<CheckIcon />}
                  onClick={() =>
                    handleUpdateTask(task._id, { completed: !task.completed })
                  }
                  colorScheme={task.completed ? "green" : "gray"}
                />
                {task.editing ? (
                  <Input
                    value={task.name}
                    onChange={(e) =>
                      handleUpdateTask(task._id, { name: e.target.value })
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter")
                        handleUpdateTask(task._id, {
                          name: task.name,
                          editing: false,
                        });
                      if (e.key === "Escape")
                        handleUpdateTask(task._id, { editing: false });
                    }}
                    autoFocus
                  />
                ) : (
                  <Text
                    as={task.completed ? "s" : "p"}
                    onDoubleClick={() =>
                      handleUpdateTask(task._id, { editing: true })
                    }
                  >
                    {task.name}
                  </Text>
                )}
              </HStack>
              <IconButton
                icon={<EditIcon />}
                onClick={() => handleUpdateTask(task._id, { editing: true })}
                colorScheme="yellow"
              />
            </HStack>
          ))}
          <Button
            onClick={handleDeleteAllTasks}
            colorScheme="red"
            variant="outline"
          >
            Delete All Tasks
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
