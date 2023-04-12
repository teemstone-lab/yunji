<script lang="ts">
	export let title: string;
</script>

<div class="flex w-full flex-col items-center space-y-5 p-4">
	<h2 class="text-center text-[26px] font-semibold">{title}</h2>
	<slot />
</div>
