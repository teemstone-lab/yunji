<script lang="ts">
	export let title: string;
	export let selectNone: boolean = false;
</script>

<div
	class="mx-auto flex w-full max-w-7xl flex-col items-center p-4 {selectNone
		? 'select-none'
		: ''}"
>
	<h2 class="my-5 text-center text-[26px] font-semibold">{title}</h2>
	<slot />
</div>
