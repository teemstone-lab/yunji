<script lang="ts">
	import { Modal } from 'flowbite-svelte';

	export let isOpen: boolean;
	export let message: string;
</script>

<Modal bind:open="{isOpen}" size="xs" autoclose>
	<div class="text-center">
		<svg
			aria-hidden="true"
			class="mx-auto h-14 w-14 text-gray-400 dark:text-gray-200"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg
		>
		<p class="my-4">{message}</p>
		<slot />
	</div>
</Modal>
