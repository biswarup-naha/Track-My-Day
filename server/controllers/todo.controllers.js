import fs from "fs";

const filePath = "./todos.json";
const getUniqueId = (todos) => {
  return todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
};

export const createTodo=async (req, res) => {
  const todo = {
    id: getUniqueId(JSON.parse(fs.readFileSync(filePath, "utf-8"))),
    ...req.body,
  };
  const todos = await JSON.parse(fs.readFileSync(filePath, "utf-8"));
  todos.push(todo);
  fs.writeFileSync(filePath, JSON.stringify(todos));
  res
    .status(201)
    .json({ success: true, message: "data addedd successfully", data: todo });
};

export const getTodos = async (req, res) => {
  const todos = await JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.status(200).json({
    success: true,
    message: "data fetched successfully",
    data: todos,
  });
};
export const updateTodo = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    console.log("Invalid ID:", req.params.id);
    return res.status(400).send("Invalid ID");
  }

  const todo = req.body;
  let todos;

  try {
    todos = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    console.log("Current todos:", todos);
  } catch (error) {
    console.error("Error reading file:", error.message);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error reading file",
        error: error.message,
      });
  }

  const index = todos.findIndex((item) => item.id === id);

  if (index !== -1) {
    todos[index] = { ...todos[index], ...todo };
    try {
      fs.writeFileSync(filePath, JSON.stringify(todos));
      console.log("Todo updated:", todos[index]);
      return res.status(200).json({
        success: true,
        message: "Data updated successfully",
        data: todos[index],
      });
    } catch (error) {
      console.error("Error writing file:", error.message);
      return res
        .status(500)
        .json({
          success: false,
          message: "Error writing file",
          error: error.message,
        });
    }
  } else {
    console.log("Todo not found for ID:", id);
    return res
      .status(404)
      .json({ success: false, message: "Data not found", data: null });
  }
};

// export const updateTodo = () => async (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   if (isNaN(id)) {
//     return res.status(400).send("Invalid ID");
//   }
//   const todo = req.body;
//   const todos = await JSON.parse(fs.readFileSync(filePath, "utf-8"));
//   const index = todos.findIndex((item) => item.id === id);

//   if (index != -1) {
//     todos[index] = todo;
//     fs.writeFileSync(filePath, JSON.stringify(todos));
//     res.status(200).json({
//       success: true,
//       message: "data updated successfully",
//       data: todos[index],
//     });
//   } else {
//     res
//       .status(404)
//       .json({ success: false, message: "Data not found", data: null });
//   }
// };

export const deleteTodo=async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).send('Invalid ID');
    }
    const todos = await JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const newTodos = todos.filter((todo) => todo.id !== id);

    if (todos.length !== newTodos.length) {
      fs.writeFileSync(filePath, JSON.stringify(newTodos));
      res.status(200).json({
        success: true,
        message: "data deleted successfully",
        data: todos,
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Data not found", data: null });
    }
  }