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
	import type { DateTimeFormatOptions, MockHostType, ShowViewerListType } from 'src/store';
	import Header from '../components/onTuneViewer/Header.svelte';
	import Footer from '../components/onTuneViewer/Footer.svelte';
	import SideNav from '../components/onTuneViewer/SideNav.svelte';
	import { mockHostsCreator } from '../mockHostsCreator';

	let list: MockHostType[] = mockHostsCreator(100, true);
	let filteredList = {
		on: list,
		off: [] as MockHostType[],
	};

	let timerId: NodeJS.Timer;
	let nowDateTime: string = '-';

	let showListType: ShowViewerListType = 'all';
	let isGMT: boolean = false;

	// #region Web Worker

	// 웹 워커 생성
	const worker = new Worker(new URL('../worker.ts', import.meta.url));

	// 웹 워커에서 메시지 받기
	worker.onmessage = (event) => {
		list = event.data as MockHostType[];
		filteredList.on = list.filter((item) => item.isOn);
		filteredList.off = list.filter((item) => !item.isOn);
		console.log('받았어용:', event.data);
	};

	const sendToWorker = () => {
		timerId = setInterval(() => {
			// 3초 경과마다 웹 워커로 메시지 보내기
			// 웹 워커는 메세지를 받고 작업 수행 결과를 보내줌
			worker.postMessage(list);
		}, 3000);
	};

	const stopToSendWorker = () => {
		clearInterval(timerId);
		worker.terminate();
	};
	// #endregion Web Worker

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
</script>

<!-- 4주차 실습하신 것을 가져와 컴포넌트 분리, 기능 추가 등의 과정을 거침 -->

<div class="viewer">
	<Header bind:isGMT="{isGMT}" nowDateTime="{nowDateTime}" />

	<div class="body">
		<SideNav
			bind:showListType="{showListType}"
			bind:list="{list}"
			bind:filteredList="{filteredList}"
		/>

		<div class="chartTab"
			><div class="flex w-full items-center justify-center space-x-1">
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
	/>
	<!--  -->
</div>
