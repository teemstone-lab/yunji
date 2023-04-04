<style>
	.container {
		margin: 0 auto;
		width: 100%;
		height: 100%;
		/* position: relative; */
		padding: 100px 0;
	}

	.scene {
		border: 1px solid #ccc;
		position: relative;
		max-width: 420px;
		width: 30%;
		max-height: 450px;
		/* height: 28rem; */
		/* width: 420px;
		height: 470px; */
		margin: 0 auto;
		perspective: 40rem;
	}

	.carousel {
		width: 100%;
		height: 100%;
		position: absolute;
		/* transform: translateZ(-120vw); */
		transform-style: preserve-3d;
		transition: transform 1s;
	}

	.carousel__cell {
		position: absolute;
		max-width: 400px;
		width: 95%;
		height: 95%;
		/* width: 400px;
		height: 450px; */
		left: 10px;
		top: 10px;
		border: 2px solid black;
		line-height: 250px;
		font-size: 5.2vw;
		font-weight: bold;
		color: white;
		text-align: center;
		transition: transform 1s, opacity 1s;
		user-select: none;
	}

	.carousel__cell:nth-child(9n + 1) {
		background: hsla(0, 100%, 50%, 0.8);
	}
	.carousel__cell:nth-child(9n + 2) {
		background: hsla(40, 100%, 50%, 0.8);
	}
	.carousel__cell:nth-child(9n + 3) {
		background: hsla(80, 100%, 50%, 0.8);
	}
	.carousel__cell:nth-child(9n + 4) {
		background: hsla(120, 100%, 50%, 0.8);
	}
	.carousel__cell:nth-child(9n + 5) {
		background: hsla(160, 100%, 50%, 0.8);
	}
	.carousel__cell:nth-child(9n + 6) {
		background: hsla(200, 100%, 50%, 0.8);
	}
	.carousel__cell:nth-child(9n + 7) {
		background: hsla(240, 100%, 50%, 0.8);
	}
	.carousel__cell:nth-child(9n + 8) {
		background: hsla(280, 100%, 50%, 0.8);
	}
	.carousel__cell:nth-child(9n + 0) {
		background: hsla(320, 100%, 50%, 0.8);
	}

	.carousel__cell:nth-child(1) {
		transform: rotateY(0deg) translateZ(120vw);
	}
	.carousel__cell:nth-child(2) {
		transform: rotateY(40deg) translateZ(120vw);
	}
	.carousel__cell:nth-child(3) {
		transform: rotateY(80deg) translateZ(120vw);
	}
	.carousel__cell:nth-child(4) {
		transform: rotateY(120deg) translateZ(120vw);
	}
	.carousel__cell:nth-child(5) {
		transform: rotateY(160deg) translateZ(120vw);
	}
	.carousel__cell:nth-child(6) {
		transform: rotateY(200deg) translateZ(120vw);
	}
	.carousel__cell:nth-child(7) {
		transform: rotateY(240deg) translateZ(120vw);
	}
	.carousel__cell:nth-child(8) {
		transform: rotateY(280deg) translateZ(120vw);
	}
	.carousel__cell:nth-child(9) {
		transform: rotateY(320deg) translateZ(120vw);
	}
</style>

<script lang="ts">
	import { Carousel, CellViewType, Horizontal } from '../components/carousel/carousel';
	import { onMount } from 'svelte';
	import Options from '../components/carousel/Options.svelte';
	import type { MockGroupHostType, MockGroupType } from 'src/store';

	// #region Web Worker - postmessage
	const worker = new Worker(new URL('../components/carousel/groupWorker.ts', import.meta.url));

	const newCreateCount = () => {
		worker.postMessage({ min: 5, max: 20 });
	};
	newCreateCount();
	// #endregion Web Worker - postmessage

	let count: number = 0;
	let groups: MockGroupType[];
	let carouselEl: HTMLElement;
	let scene: HTMLElement;
	let cells: NodeListOf<Element>;
	const carousel = new Carousel(count);
	const rotateCarousel = () => {
		carousel.rotateCarousel();

		if (carouselEl) {
			const checkCurrentIndex = carousel.selectedIndex > carousel.cellCount;

			if (checkCurrentIndex) {
				carouselEl.style.transition = 'none';

				carousel.resetAngle();
			} else {
				carouselEl.style.transition = 'transform 1s';
			}
			carouselEl.style.transform = `translateZ(${carousel.translateZ}vw) ${carousel.carouselDirection}(${carousel.angle}deg)`;
		}
	};

	const changeCarousel = () => {
		carousel.cellCount = count;

		for (let i = 0; i < cells.length; i++) {
			let cell = cells[i] as HTMLElement;

			carousel.changeCarousel(i);

			if (i < carousel.cellCount) {
				// visible cell
				cell.style.opacity = String(1);
				let cellAngle = carousel.theta * i;
				cell.style.transform = `${carousel.carouselDirection}(${cellAngle}deg) translateZ(${carousel.translateZ}vw)`;
			} else {
				// hidden cell
				cell.style.opacity = String(0);
				cell.style.transform = 'none';
			}
		}

		rotateCarousel();
	};

	const carouselAnimation = carousel.carouselAnimation(3000, rotateCarousel);

	const animationStart = () => {
		carousel.selectedIndex++;
		rotateCarousel();
		carouselAnimation();
	};

	const onOrientationChange = (radioValue: CellViewType) => {
		carousel.toggleHorizontal(radioValue);
		changeCarousel();
	};

	onMount(() => {
		scene = document.querySelector('.scene') as HTMLElement;
		carouselEl = document.querySelector('.carousel') as HTMLElement;
		cells = carouselEl && carouselEl.querySelectorAll('.carousel__cell');

		scene.style.width = `${(30 * window.innerWidth) / 100}px`;
		scene.style.height = `${(34 * window.innerWidth) / 100}px`;

		onOrientationChange(Horizontal);
	});

	// const sendToWorker = () => {
	// 	console.log('1초 뒤 시작😎👍');
	// 	setInterval(() => {
	// 		// 1초 경과마다 웹 워커로 메시지 보내기
	// 		worker.postMessage(groups);
	// 	}, 1000);
	// };
	// sendToWorker();

	// #region Web Worker - onmessage
	worker.onmessage = (event) => {
		const newGroups = event.data as MockGroupType[];
		const newCount = Number(newGroups.length);

		count = newCount;
		carousel.cellCount = newCount;
		groups = newGroups;

		changeCarousel();
	};
	// #endregion Web Worker - onmessage

	setTimeout(() => {
		// 최초 실행시, 사용자가 3초라는 긴 시간을 기다리지 않도록 하기 위함
		carousel.setRotateFunction(rotateCarousel);
		animationStart();
	}, 1000);

	const props = {
		rotateCarousel,
		changeCarousel,
		onOrientationChange,
		carouselAnimation,
		animationStart,
		newCreateCount,
	};

	const countIsOnHosts = (hosts: any) => {
		const totalHosts = hosts as MockGroupHostType[];
		const isOnHosts = totalHosts.filter((host) => host.isOn === true);
		return `${isOnHosts.length} / ${totalHosts.length}`;
	};

	const cellItems = Array(20)
		.fill(0)
		.map((_, i) => i + 1);

	// let cellItems;
	// $: {
	// 	if (groups) {
	// 		console.log('aa');
	// 		cellItems = Array(20)
	// 			.fill(null)
	// 			.map((_, i) => {
	// 				const keyName = i + 1;
	// 				console.log('groups: ', groups);

	// 				let testest;
	// 				if (i < groups.length) {
	// 					console.log('groups[i].hosts', groups[i]);
	// 					console.log('${groups[i].hosts.length}', groups[i].hosts.length);
	// 					testest = `${countIsOnHosts(groups[i].hosts)} / ${groups[i].hosts.length}`;
	// 				} else {
	// 					console.log('WOW~~~~');
	// 					testest = 'TEST~~~~';
	// 				}

	// 				const groupHosts = {
	// 					[keyName]: testest,
	// 				};
	// 				return groupHosts;
	// 			});
	// 	}
	// }
</script>

<div class="container">
	<!-- <div class="mx-auto h-full w-32"> -->
	<div class="scene">
		<div class="carousel">
			{#if cellItems}
				{#each cellItems as item, index}
					<!-- <div class="pt-[35%]"> -->
					<div
						class="carousel__cell"
						on:mouseenter="{() => carousel.stopCarouselAnimation()}"
						on:mouseleave="{() => carouselAnimation()}"
					>
						<!-- {#each Object.entries(item) as [key, value]}<p>{key}</p>
							<p>{value}</p>
						{/each} -->
						<!-- <p>{item}</p> -->

						{#if groups}
							{#each groups as group (group.id)}
								{#if groups.indexOf(group) == index}
									<p>{group.name}</p>
									<p>{countIsOnHosts(group.hosts)}</p>
								{/if}
							{/each}
						{/if}
					</div>
					<!-- </div> -->
				{/each}
			{/if}
		</div>
	</div>
	<!-- </div> -->
	<Options carousel="{carousel}" bind:count="{count}" props="{props}" />

	<!-- {#if groups}
		<div>
			{#each groups as group (group.id)}
				<p>GROUP : {group.name}</p>
				<p>ID : {group.id}</p>
				<div class="flex gap-4">
					<p>HOST ▶ </p>
					<p>{countIsOnHosts(group.hosts)} / {group.hosts.length}</p>
					{#each group.hosts as hosts}
						<div>
							<p>{hosts.name}</p>
							<p
								><span
									class="inline-block h-2 w-2 rounded-full {hosts.isOn === true
										? 'bg-blue-600'
										: 'bg-gray-400'} "></span>{hosts.isOn}</p
							>
							<dl>
								{#each Object.entries(hosts.data) as [key, value]}
									<dt class="rounded-full bg-black px-1 text-center text-white">
										{key}
									</dt>
									<dd class="text-right">{value}</dd>
								{/each}
							</dl>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{/if} -->
</div>
