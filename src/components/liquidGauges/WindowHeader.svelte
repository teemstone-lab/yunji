<script lang="ts">
	import { HostDataType, customMockHosts, windows } from './liquidGaugesViewStroe';
	import { IconCog8Tooth } from '../../icons/icons';

	export let host: HostDataType;
	export let viewOptions: Array<keyof HostDataType['data']>;
	export let index: number;

	let openOptions: boolean = false;
	let openHosts: boolean = false;

	const options = [
		{ key: 'cpu', name: 'CPU' },
		{ key: 'mem', name: 'Memory' },
		{ key: ['cpu', 'mem'], name: 'CPU + Memory' },
	];

	const selectData = (prop: any) => {
		const key = prop as keyof HostDataType['data'] | Array<keyof HostDataType['data']>;
		if (typeof key === 'object') {
			host.selectedData = key;
			viewOptions = key;
		} else {
			host.selectedData = [key];
			viewOptions = [key];
		}
		openOptions = false;
	};

	const changeHost = (selectedHost: any) => {
		$windows[index] = selectedHost as HostDataType;
	};
</script>

<div
	class="relative flex h-10 w-full items-center justify-between border-b bg-white bg-opacity-80 shadow-lg shadow-gray-50"
>
	<p class="px-2 text-lg font-bold"
		><button class="flex items-center gap-x-2" on:click="{() => (openHosts = !openHosts)}"
			><span
				class="inline-block h-2 w-2 rounded-full {host.isOn
					? 'bg-blue-600'
					: 'bg-gray-400'}"></span>
			{host.name}
		</button></p
	>
	<button
		class="flex h-full w-10 items-center justify-center opacity-70 transition-all hover:opacity-100"
		on:click="{() => (openOptions = !openOptions)}"><IconCog8Tooth solid /></button
	>
	{#if openHosts}
		<ul
			class="customScrollbar absolute left-0 top-10 z-[2] max-h-40 w-1/2 overflow-y-auto rounded-lg border bg-white shadow-lg"
		>
			{#each $customMockHosts as mockHost (mockHost.id)}
				<li class="w-full"
					><button
						class=" w-full py-2 px-3 text-left text-sm hover:bg-gray-100 disabled:text-gray-300"
						disabled="{mockHost.id === host.id}"
						on:click="{() => changeHost(mockHost)}">{mockHost.name}</button
					></li
				>
			{/each}
		</ul>
	{/if}
	{#if openOptions}
		<ul
			class="customScrollbar absolute right-0 top-10 z-[2] rounded-lg border bg-white shadow-lg"
		>
			{#each options as option (option.key)}
				<li class="w-full"
					><button
						class=" w-full py-2 px-3 text-left text-sm hover:bg-gray-100  disabled:text-gray-300"
						disabled="{option.key == viewOptions}"
						on:click="{() => selectData(option.key)}">{option.name}</button
					></li
				>
			{/each}
		</ul>
	{/if}
</div>
