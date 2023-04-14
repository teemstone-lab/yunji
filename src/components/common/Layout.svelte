<script lang="ts">
	export let title: string;
</script>

<div class="flex w-full flex-col items-center p-4">
	<h2 class="my-5 text-center text-[26px] font-semibold">{title}</h2>
	<slot />
</div>
