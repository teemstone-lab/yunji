<style>
	.container {
		display: flex;
		align-items: center;
		margin: 0 auto;
		max-width: 1500px;
		min-width: 500px;
		width: 100%;
		min-height: 250px;
		border: 1px solid red;
	}
	.scene {
		border: 1px solid #ccc;
		/* position: relative; */
		max-width: 400px;
		/* min-width: 250px; */
		width: 30%;
		max-height: 800px;
		height: 75%;
		/* width: 420px;
		height: 470px; */
		margin: 0 auto;
		perspective: 40rem;
	}

	.carousel {
		width: 100%;
		height: 100%;
		/* position: absolute; */
		/* transform: translateZ(-120vw); */
		transform-style: preserve-3d;
		transition: transform 1s;
	}

	.carousel__cell {
		position: absolute;
		width: 96%;
		height: 96%;
		/* width: 400px;
		height: 450px; */
		left: 10px;
		top: 10px;
		padding: 4%;
		border: 2px solid black;
		/* font-weight: bold; */
		color: white;
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
	/* 
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
	} */
</style>

<script lang="ts">
	import { Carousel, CellViewType, Horizontal } from '../components/carousel/carousel';
	import { onMount } from 'svelte';
	import Options from '../components/carousel/Options.svelte';
	import type { MockGroupHostType, MockGroupType } from 'src/store';

	let count: number = 0;
	let groups: MockGroupType[];
	let carouselEl: HTMLElement;
	let cells: NodeListOf<Element>;
	let scene: HTMLElement;
	let container: HTMLElement;
	const carousel = new Carousel(count);

	const rotateCarousel = () => {
		carousel.rotateCarousel();

		if (carouselEl) {
			const checkCurrentIndex =
				carousel.selectedIndex > carousel.cellCount &&
				carouselEl.style.transform.includes('rotateY(-360deg)');

			if (checkCurrentIndex) {
				carouselEl.style.transition = 'none';
				carousel.resetAngle();
			} else {
				carouselEl.style.transition = 'transform 1s';
			}
			carouselEl.style.transform = `translateZ(${carousel.translateZ}px) ${carousel.carouselDirection}(${carousel.angle}deg)`;
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
				cell.style.transform = `${carousel.carouselDirection}(${cellAngle}deg) translateZ(${carousel.translateZ}px)`;
			} else {
				// hidden cell
				cell.style.opacity = String(0);
				cell.style.transform = 'none';
			}
		}

		rotateCarousel();
	};

	let worker: Worker;

	const initWorker = () => {
		worker = new Worker(new URL('../components/carousel/groupWorker.ts', import.meta.url));
		worker.onmessage = (event) => {
			const newGroups = event.data as MockGroupType[];
			const newCount = Number(newGroups.length);

			count = newCount;
			carousel.cellCount = newCount;
			groups = newGroups;

			changeCarousel();
		};
	};

	const newCreateCount = () => {
		if (!worker) {
			initWorker();
		}
		worker.postMessage({ min: 5, max: 20, groups });
	};
	newCreateCount();
	// #endregion Web Worker - postmessage

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
		container = document.querySelector('.container') as HTMLElement;

		carousel.calcContainerSize(container.offsetWidth);
		carousel.cellWidth = Number((cells[0] as HTMLElement).offsetWidth);

		container.style.height = `${carousel.containerHeight}px`;

		onOrientationChange(Horizontal);
	});

	// #region Web Worker - onmessage
	if (worker!) {
		worker.onmessage = (event) => {
			const newGroups = event.data as MockGroupType[];
			const newCount = Number(newGroups.length);

			count = newCount;
			carousel.cellCount = newCount;
			groups = newGroups;

			changeCarousel();
		};
	}
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

		const result = { onHosts: isOnHosts.length, totalHosts: totalHosts.length };
		return result;
	};

	const cellItems = Array(20)
		.fill(0)
		.map((_, i) => i + 1);

	const topCpu = (hosts: any) => {
		const groupHosts = hosts as MockGroupHostType[];
		const cpu = groupHosts
			.filter((host) => host.isOn === true)
			.sort((a, b) => b.data.cpu - a.data.cpu)
			.slice(0, 5);

		return cpu;
	};
	const topMem = (hosts: any) => {
		const groupHosts = hosts as MockGroupHostType[];
		const mem = groupHosts
			.filter((host) => host.isOn === true)
			.sort((a, b) => b.data.mem - a.data.mem)
			.slice(0, 5);

		return mem;
	};

	const debounce = (callback: () => void, delay: number) => {
		let timerId: NodeJS.Timeout | null;

		return () => {
			if (timerId) {
				clearTimeout(timerId);
			}
			timerId = setTimeout(() => {
				callback();
				timerId = null;
			}, delay);
		};
	};
	const resizingContainer = () => {
		carousel.calcContainerSize(container.offsetWidth);
		container.style.height = `${carousel.containerHeight}px`;
		carousel.cellWidth = Number((cells[0] as HTMLElement).offsetWidth);
	};
</script>

<svelte:window
	on:resize="{() => {
		debounce(resizingContainer, 1000)();
	}}"
/>
<div class="mx-auto h-full w-full p-[100px]">
	<div class="container">
		<div class="scene">
			<div class="carousel">
				{#if cellItems}
					{#each cellItems as item, index}
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
										<div
											class="flex h-full flex-col items-center justify-between"
										>
											<h2
												class="w-full text-lg font-semibold lg:text-2xl
										">{group.name}</h2
											>
											<p class="font-bold"
												><span class="text-6xl"
													>{countIsOnHosts(group.hosts).onHosts}</span
												>
												<span class="relative -bottom-2 w-max text-xl"
													>/ {countIsOnHosts(group.hosts)
														.totalHosts}</span
												></p
											>
											<ul class="grid w-full grid-cols-2 gap-4 px-4 text-sm">
												<li>
													<p class="font-semibold">CPU</p>
													<ol class="space-y-1">
														{#each topCpu(group.hosts) as topHost (topHost.name)}
															<li
																class="relative overflow-hidden rounded bg-black bg-opacity-30"
															>
																<p
																	class="relative z-[1] flex w-full items-center justify-between rounded border border-white px-0.5 text-black"
																	><span
																		class="text-rtl inline-block w-2/3 truncate rounded-sm font-medium"
																		>{topHost.name}</span
																	>
																	<span class="font-semibold">
																		<!-- 타입 에러로 주석처리 후 커밋. -->
																		<!-- {topHost.data.cpu} -->
																	</span></p
																>

																<!-- <div
																	class="absolute -inset-1 inline-block bg-white bg-opacity-50 "
																	style="{`width: ${topHost.data.cpu}%;`}"
																></div> -->
															</li>
														{/each}
													</ol>
												</li>
												<li>
													<p class="font-semibold">Memory</p>
													<ol class="space-y-1">
														{#each topMem(group.hosts) as topHost (topHost.name)}
															<li
																class="relative overflow-hidden bg-black bg-opacity-40 "
															>
																<p
																	class="relative z-[1] flex w-full items-center justify-between rounded border border-white px-1 text-black"
																	><span
																		class="text-rtl inline-block w-2/3 truncate rounded-sm font-medium"
																		>{topHost.name}</span
																	>
																	<span class="font-semibold"
																		><!-- 타입 에러로 주석처리 후 커밋. -->
																		<!-- {topHost.data.mem} -->
																	</span></p
																>

																<!-- <div
																	class="absolute -inset-1 inline-block bg-white bg-opacity-50 "
																	style="{`width: ${topHost.data.mem}%;`}"
																></div> -->
															</li>
														{/each}
													</ol>
												</li>
											</ul>
										</div>
									{/if}
								{/each}
							{/if}
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
	<Options carousel="{carousel}" bind:count="{count}" props="{props}" />
</div>
