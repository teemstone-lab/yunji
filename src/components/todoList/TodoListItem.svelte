<script lang="ts">
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import type { TodoListItemType } from './todoListStore';
	import { IconCheck, IconPencil, IconTrash, IconXMark } from '../../icons/icons';

	export let deleteTodo: (id: string, showAlert?: boolean) => void;
	export let todo: TodoListItemType;

	export let isEdit: string | undefined;
	export let isNewItem: boolean;

	let isEmpty: boolean = false;

	let editedTitle: string = todo.title;

	const cancelTodo = (id: string) => {
		if (todo.title.trim() === '' || !todo.title) {
			deleteTodo(id);
		} else {
			editedTitle = todo.title;
		}
		isEdit = undefined;
		isNewItem = false;
	};

	const saveTodo = () => {
		if (editedTitle.trim().length > 0) {
			todo.title = editedTitle;
			isEdit = undefined;
			isNewItem = false;
		} else {
			// cancelTodo(todo.id);
			isEmpty = true;
		}
	};

	const keyPressFunc = (key: string) => {
		switch (key) {
			case 'Enter':
				saveTodo();
				break;
			case 'Escape':
				cancelTodo(todo.id);
				break;
		}
	};
</script>

<li class="flex h-12 items-center justify-between gap-x-4 rounded-lg bg-white px-4 text-sm">
	<div class="flex h-full w-full items-center gap-x-2 hover:cursor-pointer">
		<input
			id="{todo.id}"
			type="checkbox"
			bind:checked="{todo.isDone}"
			class="h-4 w-4 flex-shrink-0 rounded border-indigo-400 checked:bg-indigo-600 hover:cursor-pointer focus:ring-indigo-500 disabled:border-gray-300 disabled:bg-gray-100"
			disabled="{isEdit === todo.id}"
		/>
		{#if isEdit === todo.id}
			<input
				bind:value="{editedTitle}"
				on:keydown="{(e) => keyPressFunc(String(e.key))}"
				on:mousedown="{() => (isEmpty = false)}"
				autofocus="{isEdit === todo.id}"
				class="h-[60%] w-full border-b-2 border-indigo-600 placeholder:text-xs placeholder:text-red-600 focus:outline-0"
				placeholder="{isEmpty ? '내용을 입력해주세요!' : ''}"
			/>
		{:else}
			<label
				for="{todo.id}"
				class="{todo.isDone
					? 'font-medium text-gray-400'
					: 'font-semibold text-gray-700'} inline-flex h-full w-full select-none items-center hover:cursor-pointer"
				>{todo.title}</label
			>
		{/if}
	</div>
	<div class="flex flex-shrink-0">
		{#if isEdit === todo.id}
			<ButtonGroup>
				<Button color="alternative" size="xs" on:click="{() => saveTodo()}"
					><IconCheck width="{18}" height="{18}" /></Button
				>
				<Button color="light" size="xs" on:click="{() => cancelTodo(todo.id)}"
					><IconXMark width="{18}" height="{18}" /></Button
				>
			</ButtonGroup>
		{:else}
			<ButtonGroup>
				<Button color="alternative" size="xs" on:click="{() => (isEdit = todo.id)}"
					><IconPencil width="{18}" height="{18}" /></Button
				>
				<Button
					color="red"
					size="xs"
					on:click="{() => {
						deleteTodo(todo.id, true);
					}}"><IconTrash width="{18}" height="{18}" /></Button
				>
			</ButtonGroup>
		{/if}
	</div>
</li>
