<script lang="ts">
	import type { HostDataType } from '../liquidGaugesViewStroe';
	import HostList from './HostList.svelte';
	import Options from './Options.svelte';

	export let host: HostDataType;
	export let index: number;
</script>

<div
	class="relative flex h-16 w-full items-center justify-between border-b bg-white bg-opacity-80 shadow-lg shadow-gray-50"
>
	<HostList bind:host="{host}" index="{index}" />
	<Options bind:host="{host}" />
</div>
