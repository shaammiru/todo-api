import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Todo } from './interfaces/todo.interface';
import { NotFoundException } from '@nestjs/common';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo', () => {
      const todoData = { title: 'Test Todo', description: 'Test Description' };
      const todo = service.create(todoData);
      expect(todo).toHaveProperty('id');
      expect(todo.title).toBe(todoData.title);
      expect(todo.description).toBe(todoData.description);
      expect(todo.completed).toBe(false);
      expect(service.findAll()).toHaveLength(1);
      expect(service.findAll()[0]).toEqual(todo);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', () => {
      expect(service.findAll()).toEqual([]);
      service.create({ title: 'Todo 1' });
      service.create({ title: 'Todo 2' });
      expect(service.findAll()).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('should return a single todo if found', () => {
      const todoData = { title: 'Test Find' };
      const createdTodo = service.create(todoData);
      const foundTodo = service.findOne(createdTodo.id);
      expect(foundTodo).toEqual(createdTodo);
    });

    it('should throw NotFoundException if todo not found', () => {
      expect(() => service.findOne('nonexistent-id')).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an existing todo', () => {
      const createdTodo = service.create({ title: 'Initial Title' });
      const updates = { title: 'Updated Title', completed: true, description: 'New Desc' };
      const updatedTodo = service.update(createdTodo.id, updates);

      expect(updatedTodo.id).toBe(createdTodo.id);
      expect(updatedTodo.title).toBe(updates.title);
      expect(updatedTodo.completed).toBe(updates.completed);
      expect(updatedTodo.description).toBe(updates.description);
    });

    it('should partially update an existing todo', () => {
      const createdTodo = service.create({ title: 'Partial Update', description: 'Keep this' });
      const updates = { completed: true };
      const updatedTodo = service.update(createdTodo.id, updates);

      expect(updatedTodo.id).toBe(createdTodo.id);
      expect(updatedTodo.title).toBe('Partial Update');
      expect(updatedTodo.description).toBe('Keep this');
      expect(updatedTodo.completed).toBe(true);
    });

    it('should throw NotFoundException if todo to update is not found', () => {
      expect(() => service.update('nonexistent-id', { title: 'Update Fail' })).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an existing todo', () => {
      const createdTodo1 = service.create({ title: 'To Delete' });
      const createdTodo2 = service.create({ title: 'To Keep' });
      expect(service.findAll()).toHaveLength(2);

      const result = service.remove(createdTodo1.id);
      expect(result).toEqual({ deleted: true, id: createdTodo1.id });
      expect(service.findAll()).toHaveLength(1);
      expect(service.findAll()[0]).toEqual(createdTodo2);
    });

    it('should throw NotFoundException if todo to remove is not found', () => {
      expect(() => service.remove('nonexistent-id')).toThrow(NotFoundException);
    });
  });
});
