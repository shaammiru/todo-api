import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
// DTOs will be used in the next step, for now using partial Todo for create/update
// import { CreateTodoDto } from './dto/create-todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private currentId: number = 1; // Simple ID generator

  create(todoData: Omit<Todo, 'id' | 'completed'>): Todo {
    const newTodo: Todo = {
      id: (this.currentId++).toString(),
      ...todoData,
      completed: false, // Default to not completed
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string): Todo {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    return todo;
  }

  update(id: string, todoUpdateData: Partial<Omit<Todo, 'id'>>): Todo {
    const todo = this.findOne(id); // Leverages the not found exception
    const todoIndex = this.todos.findIndex(t => t.id === id);

    // Create an updated version of the todo item
    const updatedTodo = { ...todo, ...todoUpdateData };

    // Update the item in the array
    this.todos[todoIndex] = updatedTodo;
    return updatedTodo;
  }

  remove(id: string): { deleted: boolean; id: string } {
    const todoIndex = this.todos.findIndex(t => t.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    this.todos.splice(todoIndex, 1);
    return { deleted: true, id };
  }
}
