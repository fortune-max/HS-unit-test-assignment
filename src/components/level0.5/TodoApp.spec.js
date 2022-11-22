import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import TodoApp from './TodoApp.vue';

test('renders a todo', () => {
  const wrapper = mount(TodoApp);

  const todo = wrapper.get('[data-test="todo"]');

  expect(todo.text()).toBe('Learn Vue.js 3');
});


test('creates a todo', async () => {
  const wrapper = mount(TodoApp);
  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1);

  await wrapper.find('[data-test="new-todo-input"]').setValue('New todo');
  await wrapper.find('[data-test="new-todo-btn"]').trigger('click');

  const todos = wrapper.findAll('[data-test="todo"]');
  expect(todos).toHaveLength(2);
  expect(todos[1].text()).toBe('New todo');
});

test('completes a todo', async () => {
  const wrapper = mount(TodoApp);

  await wrapper.get('[data-test="todo-checkbox"]').setValue(true);

  expect(wrapper.get('[data-test="todo"]').classes()).toContain('completed');
});
