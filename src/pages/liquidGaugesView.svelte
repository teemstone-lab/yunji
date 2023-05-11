<script lang="ts">
	import {
		HostDataType,
		customMockHosts,
	} from '../components/liquidGauges/liquidGaugesViewStroe';
	import Window from '../components/liquidGauges/Window.svelte';
	import ViewOptions from '../components/liquidGauges/ViewOptions.svelte';

	// const worker = new Worker(
	// 	new URL('../components/liquidGauges/getHostsWorker.ts', import.meta.url),
	// );

	// worker.postMessage('TEST');
	// worker.onmessage = (event) => {
	// 	const data = event.data as BasicHostDataType[];
	// 	console.log(event.data);
	// 	hosts = data;
	// };

	import { worker } from '../mocks/worker';

	const getUpdatedData = () => {
		fetch('/hosts/data')
			.then((response) => response.json())
			.then((data) => ($customMockHosts = data as HostDataType[]))
			.catch((error) => console.error(error));
	};

	let timerId: NodeJS.Timeout;
	let updating: boolean = false;

	const updateData = (delay: number = 2000) => {
		updating = true;
		getUpdatedData();

		clearInterval(timerId);
		timerId = setInterval(() => {
			getUpdatedData();
		}, delay);
	};

	if (process.env.NODE_ENV === 'development') {
		worker.start().catch((error) => console.error(error));

		fetch('/hosts')
			.then((response) => response.json())
			.then((data) => ($customMockHosts = data as HostDataType[]))
			// .then(() => updateData())
			.catch((error) => console.error(error));
	}

	let selected: number = 4;
	let dark: boolean = false;
</script>

<div class="h-screen w-full {dark ? 'bg-blue-900' : 'bg-white'} p-4">
	<ViewOptions
		bind:selected="{selected}"
		bind:dark="{dark}"
		bind:updating="{updating}"
		timerId="{timerId}"
		updateData="{updateData}"
	/>

	<!-- 전체 Host 리스트 따로 / 화면에 그려주는 리스트 따로. -->
	<!-- 그래야 호스트를 선택하여 보는 것이 가능할 것. -->
	<div class="mx-auto grid gap-5 p-4 lg:max-w-5xl lg:grid-cols-2 2xl:max-w-7xl">
		{#if $customMockHosts}
			{#each $customMockHosts.slice(0, selected) as host (host.id)}
				<Window bind:host="{host}" />
			{/each}
		{/if}
	</div>
</div>
