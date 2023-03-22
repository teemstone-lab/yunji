<script lang="ts">
	import Layout from '../components/test/Layout.svelte';

	let list: {
		name: number;
		isOn: boolean;
	}[] = [
		{
			name: 1,
			isOn: true,
		},
		{
			name: 2,
			isOn: true,
		},
		{
			name: 3,
			isOn: true,
		},
		{
			name: 4,
			isOn: true,
		},
		{
			name: 5,
			isOn: true,
		},
		{
			name: 6,
			isOn: true,
		},
		{
			name: 7,
			isOn: true,
		},
		{
			name: 8,
			isOn: true,
		},
		{
			name: 9,
			isOn: true,
		},
		{
			name: 10,
			isOn: true,
		},
		{
			name: 11,
			isOn: true,
		},
		{
			name: 12,
			isOn: true,
		},
		{
			name: 13,
			isOn: true,
		},
		{
			name: 14,
			isOn: true,
		},
		{
			name: 15,
			isOn: true,
		},
		{
			name: 16,
			isOn: true,
		},
		{
			name: 17,
			isOn: true,
		},
		{
			name: 18,
			isOn: true,
		},
		{
			name: 19,
			isOn: true,
		},
		{
			name: 20,
			isOn: true,
		},
		{
			name: 21,
			isOn: true,
		},
		{
			name: 22,
			isOn: true,
		},
		{
			name: 23,
			isOn: true,
		},
		{
			name: 24,
			isOn: true,
		},
		{
			name: 25,
			isOn: true,
		},
		{
			name: 26,
			isOn: true,
		},
		{
			name: 27,
			isOn: true,
		},
		{
			name: 28,
			isOn: true,
		},
		{
			name: 29,
			isOn: true,
		},
		{
			name: 30,
			isOn: true,
		},
		{
			name: 31,
			isOn: true,
		},
		{
			name: 32,
			isOn: true,
		},
		{
			name: 33,
			isOn: true,
		},
		{
			name: 34,
			isOn: true,
		},
		{
			name: 35,
			isOn: true,
		},
		{
			name: 36,
			isOn: true,
		},
		{
			name: 37,
			isOn: true,
		},
		{
			name: 38,
			isOn: true,
		},
		{
			name: 39,
			isOn: true,
		},
		{
			name: 40,
			isOn: true,
		},
		{
			name: 41,
			isOn: true,
		},
		{
			name: 42,
			isOn: true,
		},
		{
			name: 43,
			isOn: true,
		},
		{
			name: 44,
			isOn: true,
		},
		{
			name: 45,
			isOn: true,
		},
		{
			name: 46,
			isOn: true,
		},
		{
			name: 47,
			isOn: true,
		},
		{
			name: 48,
			isOn: true,
		},
		{
			name: 49,
			isOn: true,
		},
		{
			name: 50,
			isOn: true,
		},
		{
			name: 51,
			isOn: true,
		},
		{
			name: 52,
			isOn: true,
		},
		{
			name: 53,
			isOn: true,
		},
		{
			name: 54,
			isOn: true,
		},
		{
			name: 55,
			isOn: true,
		},
		{
			name: 56,
			isOn: true,
		},
		{
			name: 57,
			isOn: true,
		},
		{
			name: 58,
			isOn: true,
		},
		{
			name: 59,
			isOn: true,
		},
		{
			name: 60,
			isOn: true,
		},
		{
			name: 61,
			isOn: true,
		},
		{
			name: 62,
			isOn: true,
		},
		{
			name: 63,
			isOn: true,
		},
		{
			name: 64,
			isOn: true,
		},
		{
			name: 65,
			isOn: true,
		},
		{
			name: 66,
			isOn: true,
		},
		{
			name: 67,
			isOn: true,
		},
		{
			name: 68,
			isOn: true,
		},
		{
			name: 69,
			isOn: true,
		},
		{
			name: 70,
			isOn: true,
		},
		{
			name: 71,
			isOn: true,
		},
		{
			name: 72,
			isOn: true,
		},
		{
			name: 73,
			isOn: true,
		},
		{
			name: 74,
			isOn: true,
		},
		{
			name: 75,
			isOn: true,
		},
		{
			name: 76,
			isOn: true,
		},
		{
			name: 77,
			isOn: true,
		},
		{
			name: 78,
			isOn: true,
		},
		{
			name: 79,
			isOn: true,
		},
		{
			name: 80,
			isOn: true,
		},
		{
			name: 81,
			isOn: true,
		},
		{
			name: 82,
			isOn: true,
		},
		{
			name: 83,
			isOn: true,
		},
		{
			name: 84,
			isOn: true,
		},
		{
			name: 85,
			isOn: true,
		},
		{
			name: 86,
			isOn: true,
		},
		{
			name: 87,
			isOn: true,
		},
		{
			name: 88,
			isOn: true,
		},
		{
			name: 89,
			isOn: true,
		},
		{
			name: 90,
			isOn: true,
		},
		{
			name: 91,
			isOn: true,
		},
		{
			name: 92,
			isOn: true,
		},
		{
			name: 93,
			isOn: true,
		},
		{
			name: 94,
			isOn: true,
		},
		{
			name: 95,
			isOn: true,
		},
		{
			name: 96,
			isOn: true,
		},
		{
			name: 97,
			isOn: true,
		},
		{
			name: 98,
			isOn: true,
		},
		{
			name: 99,
			isOn: true,
		},
		{
			name: 100,
			isOn: true,
		},
	];

	const mockHosts = (limit: number, isOn?: boolean) => {
		const numberMaker = (num: number) => {
			const checkNumSize = num >= 0.5 ? true : false;
			return checkNumSize;
		};

		const hosts = [];

		for (let i = 0; i < limit; i++) {
			hosts.push({ name: i + 1, isOn: isOn ? isOn : numberMaker(Math.random()) });
		}

		return hosts;
	};
	let timerId: NodeJS.Timer;
	let animation: string;

	const sendToWorker = () => {
		// animation = 'animate-spin';
		animation = 'animate-move';
		timerId = setInterval(() => {
			list = mockHosts(7000);
			console.log(list);
			console.log(Date.now());
		}, 3000);
	};

	const stopToSendWorker = () => {
		animation = 'animate-none';
		clearInterval(timerId);
	};
</script>

<Layout title="noWorker">
	<div class="flex items-center space-x-1">
		<button
			type="button"
			class="rounded-md bg-blue-600 p-2 px-4 font-medium text-white hover:bg-blue-800"
			on:click="{() => {
				sendToWorker();
				console.log(Date.now());
			}}">Start</button
		>
		<button
			type="button"
			class="rounded-md bg-red-600 p-2 px-4 font-medium text-white hover:bg-red-800"
			on:click="{() => {
				stopToSendWorker();
			}}">Stop</button
		>
	</div>
	<div class="flex space-x-4">
		<ul class="grid w-1/2 grid-cols-5">
			{#each Array(4000) as _, idx}
				<li
					><span
						class="{animation} absolute inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-center text-xs"
						>{idx}</span
					></li
				>
			{/each}
		</ul>
		<ul class="flex w-1/2 flex-col space-y-2">
			{#each list as item}
				<li>
					<span
						class="{`inline-block h-3 w-3 rounded-full transition-all duration-500 ${
							item.isOn ? 'bg-blue-600' : 'bg-gray-400'
						}`}"></span>
					{item.name}
				</li>
			{/each}
		</ul>
	</div>
</Layout>
