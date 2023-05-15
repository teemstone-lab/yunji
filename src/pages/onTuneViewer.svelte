<!-- 원본 출처 : 유정선임님🥰 -->
<style>
	.viewer {
		display: flex;
		flex-direction: column;
	}

	.body {
		display: flex;
	}

	.chartTab {
		display: flex;
		background-color: #323232;
		width: 100%;
		border: 2px solid gray;
		min-height: calc(100vh - 120px);
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { Header, SideNav, Footer } from '../components/onTuneViewer';
	import type { DateTimeFormatOptions, MockHostType, ShowViewerListType } from 'src/store';
	import { push, querystring, location } from 'svelte-spa-router';

	let list: MockHostType[] = [];
	let filteredList = {
		on: list,
		off: [] as MockHostType[],
	};

	let timerId: NodeJS.Timer;
	let nowDateTime: string = '-';

	let showListType: ShowViewerListType = 'all';
	let isGMT: boolean = false;

	let isActive: boolean = false;

	// #region Web Worker

	// 웹 워커 생성
	const worker = new Worker(new URL('../worker.ts', import.meta.url));
	const newHostsCreate = () => worker.postMessage({ limit: 100, isAllTrue: true });

	newHostsCreate();

	// 웹 워커에서 메시지 받기
	worker.onmessage = (event) => {
		list = event.data as MockHostType[];
		filteredList.on = list.filter((item) => item.isOn);
		filteredList.off = list.filter((item) => !item.isOn);
		console.log('받았어용:', event.data);
	};

	const sendToWorker = () => {
		console.log('3초 뒤 시작😎👍');
		timerId = setInterval(() => {
			// 3초 경과마다 웹 워커로 메시지 보내기
			// 웹 워커는 메세지를 받고 작업 수행 결과를 보내줌
			worker.postMessage(list);
		}, 3000);
	};

	const stopToSendWorker = () => {
		clearInterval(timerId);
		isActive = false;
		newHostsCreate();
	};
	// #endregion Web Worker

	// #region Date-Time
	const dateTime = () => {
		const options: DateTimeFormatOptions = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false,
			timeZone: isGMT ? 'GMT' : undefined,
			timeZoneName: 'longOffset',
		};
		const now = new Intl.DateTimeFormat('default', options).format(new Date());

		nowDateTime = now;
	};
	setInterval(() => dateTime(), 1000);
	// #endregion Date-Time

	onMount(() => {
		showListType = $querystring?.split('=')[1] as ShowViewerListType;
	});

	const viewFilterHandler = () => push(`${$location}?view=${showListType}`);
</script>

<!-- 4주차 실습하신 것을 가져와 컴포넌트 분리, 기능 추가 등의 과정을 거침 -->

<div class="viewer">
	<Header bind:isGMT="{isGMT}" nowDateTime="{nowDateTime}" />

	<div class="body">
		<SideNav
			bind:showListType="{showListType}"
			bind:list="{list}"
			bind:filteredList="{filteredList}"
			viewFilterHandler="{viewFilterHandler}"
		/>

		<div class="chartTab"
			><div class="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
				<button
					type="button"
					class="rounded-md bg-blue-600 p-2 px-4 font-medium text-white hover:bg-blue-800"
					on:click="{() => {
						if (isActive === false) {
							isActive = true;
							sendToWorker();
						}
					}}">Start</button
				>
				<button
					type="button"
					class="rounded-md bg-red-600 p-2 px-4 font-medium text-white hover:bg-red-800"
					on:click="{() => {
						stopToSendWorker();
					}}">Stop</button
				>
			</div></div
		>
	</div>
	<!--  -->
	<Footer
		bind:isGMT="{isGMT}"
		nowDateTime="{nowDateTime}"
		bind:showListType="{showListType}"
		list="{list}"
		filteredList="{filteredList}"
		viewFilterHandler="{viewFilterHandler}"
	/>
	<!--  -->
</div>
