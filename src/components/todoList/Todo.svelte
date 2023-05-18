<script lang="ts">
	import { Button, Spinner } from 'flowbite-svelte';
	import type { TodoListItemType } from './todoListStore';
	import Search from './Search.svelte';
	import TodoList from './TodoList.svelte';
	import { IconPlus } from '../../icons/icons';
	import Modal from '../common/Modal.svelte';

	export let showAlert: boolean;

	let title: string = '';
	let todos: Array<TodoListItemType> = [];
	let filterdTodos: Array<TodoListItemType> = [];
	let todoLists: Array<TodoListItemType>;

	let isEdit: string | undefined = undefined;
	let isSearch: boolean = false;
	let isNewItem: boolean = false;
	let isLoading: boolean = false;

	let deletedItem: string | undefined;
	let isOpen = deletedItem ? true : false;

	let searchKeyword: string = '';

	const updateTodoList = () => {
		if (isSearch) {
			const newItem = todos.slice(-1);

			filterdTodos = todos.filter((t) =>
				t.title.replaceAll(' ', '').includes(searchKeyword.replaceAll(' ', '')),
			);
			todoLists = isNewItem
				? ([...filterdTodos, newItem[0]] as TodoListItemType[])
				: filterdTodos;
		} else {
			todoLists = todos;
		}
	};

	const createTodo = () => {
		const id = String(self.crypto.randomUUID());
		todos.push({
			id,
			title,
			isDone: false,
		});

		isNewItem = true;
		isEdit = id;

		updateTodoList();

		title = '';
	};

	const showAlertMessage = () => {
		setTimeout(() => {
			showAlert = false;
			isOpen = false;
		}, 3000);
	};

	const deleteTodo = (id: string, alert?: boolean) => {
		if (alert) {
			isOpen = true;
			deletedItem = id;
		} else {
			deletedItem = undefined;
			todos = todos.filter((t) => t.id !== id);
			updateTodoList();
		}
	};
</script>

<div
	class="relative flex h-[540px] w-full flex-col space-y-4 rounded-xl bg-gray-100 p-4 text-gray-700 shadow-xl shadow-gray-200 md:w-[400px]"
>
	<Search
		updateTodoList="{updateTodoList}"
		bind:searchKeyword="{searchKeyword}"
		bind:isSearch="{isSearch}"
		bind:isEdit="{isEdit}"
		bind:isLoading="{isLoading}"
	/>

	{#if isLoading}
		<div class="absolute inset-0 flex h-full w-full items-center justify-center">
			<Button color="alternative">
				<Spinner class="mr-3" size="5" />Loading ...
			</Button>
		</div>
	{/if}

	<TodoList
		bind:todoLists="{todoLists}"
		deleteTodo="{deleteTodo}"
		bind:isEdit="{isEdit}"
		bind:isNewItem="{isNewItem}"
	/>

	<div class="text-center">
		<button
			title="Add button"
			type="button"
			on:click="{() => !isNewItem && createTodo()}"
			class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 p-4 text-white shadow-lg shadow-gray-300 transition-all duration-100 hover:bg-indigo-700"
			><IconPlus width="{24}" height="{24}" strokeWidth="{2.5}" />
		</button>
	</div>
</div>

<Modal bind:isOpen="{isOpen}" message="Are you sure you want to delete this todo item?">
	<Button
		color="red"
		on:click="{() => {
			if (deletedItem) {
				deleteTodo(deletedItem);

				showAlert = true;
				showAlertMessage();
			}
		}}">Delete</Button
	>
	<Button color="light" on:click="{() => (deletedItem = undefined)}">Cancel</Button>
</Modal>
