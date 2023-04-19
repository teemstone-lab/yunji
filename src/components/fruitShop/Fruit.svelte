<script lang="ts">
	export let name: string;
	export let icon: string;
</script>

<li
	class="flex h-16 w-16 items-center justify-center rounded-3xl text-4xl hover:cursor-move"
	on:click
	draggable="{true}"
	on:dragstart>{icon}</li
>
