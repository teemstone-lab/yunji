<script lang="ts">
	import { IconFaceFrown } from '../../icons/icons';
	import TodoListItem from './TodoListItem.svelte';
	import type { TodoListItemType } from './todoListStore';

	export let todoLists: Array<TodoListItemType>;
	export let deleteTodo: (id: string, showAlert?: boolean) => void;
	export let isEdit: string | undefined;
	export let isNewItem: boolean;
</script>

<ul class="customScrollbar h-full w-full space-y-4 overflow-y-scroll">
	{#if todoLists && todoLists.length > 0}
		{#each todoLists as todo (todo.id)}
			<TodoListItem
				deleteTodo="{deleteTodo}"
				bind:todo="{todo}"
				bind:isEdit="{isEdit}"
				bind:isNewItem="{isNewItem}"
			/>
		{/each}
	{:else}
		<li class="text flex h-full w-full flex-col items-center justify-center text-gray-400"
			><IconFaceFrown />
			NO ITEM</li
		>
	{/if}
</ul>
