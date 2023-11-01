import AsyncStorage from "@react-native-async-storage/async-storage";

const TODOS_STORE_KEY = "@todos";
const INPROGRESS_STORE_KEY = "@inprogress";
const COMPLETED_STORE_KEY = "@complete";
const NEXT_KEY = "@nextkey";

export default {
  async getTodos() {
    try {
      const storedTodos = await AsyncStorage.getItem(TODOS_STORE_KEY);
      const storedInprogress = await AsyncStorage.getItem(INPROGRESS_STORE_KEY);
      const storedComplete = await AsyncStorage.getItem(COMPLETED_STORE_KEY);
      let nextKey = await AsyncStorage.getItem(NEXT_KEY);
      const retval = {
        todos: storedTodos ? JSON.parse(storedTodos) : [],
        inprogress: storedInprogress ? JSON.parse(storedInprogress) : [],
        complete: storedComplete ? JSON.parse(storedComplete) : [],
        nextKey: nextKey ? Number(nextKey) : 0,
      };
      return retval;
    } catch (error) {
      console.log("Failed to get todos", error);
    }
  },
  async saveTodos(todos) {
    try {
      await AsyncStorage.setItem(TODOS_STORE_KEY, JSON.stringify(todos.todos));
      await AsyncStorage.setItem(
        INPROGRESS_STORE_KEY,
        JSON.stringify(todos.inprogress)
      );
      await AsyncStorage.setItem(
        COMPLETED_STORE_KEY,
        JSON.stringify(todos.complete)
      );
      await AsyncStorage.setItem(NEXT_KEY, todos.nextKey.toString());
    } catch (error) {
      console.log("Failed to save todos", error);
    }
  },
  async deleteTodos() {
    await AsyncStorage.removeItem(TODOS_STORE_KEY);
    await AsyncStorage.removeItem(INPROGRESS_STORE_KEY);
    await AsyncStorage.removeItem(COMPLETED_STORE_KEY);
    await AsyncStorage.removeItem(NEXT_KEY);
  },
};
