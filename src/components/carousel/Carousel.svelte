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
		/* max-width: 400px; */
		/* min-width: 250px; */
		width: 30%;
		/* max-height: 800px; */
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
</style>

<script lang="ts">
	import { Carousel, CellViewType, Vertical } from './carousel';
	import { onMount } from 'svelte';
	import Options from './Options.svelte';
	import type { MockGroupType } from 'src/store';
	export let numberOfCells: { min: number; max: number };
	export let datas: MockGroupType[];
	export let showTopData: Array<'cpu' | 'mem' | 'swap' | 'disk'>;

	let isStop: boolean = false;
	let count: number = datas.length;
	// let groups: MockGroupType[];
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

	const carouselAnimation = carousel.carouselAnimation(3000, rotateCarousel);

	const animationStart = () => {
		carousel.selectedIndex++;
		rotateCarousel();
		carouselAnimation();
	};

	const onOrientationChange = (radioValue: CellViewType) => {
		// 해당 함수 부분 아직 미완
		carousel.toggleHorizontal(radioValue);
		const containerWidth = container.offsetWidth;
		const containerHeight = container.offsetHeight;
		const containerMaxWidth = container.style.maxWidth;
		const containerMaxHeight = container.style.maxHeight;

		const cellWidth = Number((cells[0] as HTMLElement).offsetWidth);
		// const cellHeight = Number((cells[0] as HTMLElement).offsetHeight);

		container.style.width = `${containerHeight}px`;
		container.style.height = `${containerWidth}px`;
		container.style.maxWidth = `${containerMaxHeight}px`;
		container.style.maxHeight = `${containerMaxWidth}px`;

		if (radioValue === Vertical) {
			scene.style.width = `75%`;
			scene.style.height = `30%`;
			carousel.cellWidth = Number((cells[0] as HTMLElement).offsetWidth);
		} else {
			container.style.width = `100%`;
			scene.style.width = `30%`;
			scene.style.height = `75%`;
			carousel.cellWidth = Number((cells[0] as HTMLElement).offsetWidth);
		}
		console.log('cellWidth: ', cellWidth);
		carousel.cellWidth = cellWidth;
		console.log('carousel.cellWidth: ', carousel.cellWidth);

		changeCarousel();
	};

	onMount(() => {
		scene = document.querySelector('.scene') as HTMLElement;
		carouselEl = document.querySelector('.carousel') as HTMLElement;
		cells = carouselEl && carouselEl.querySelectorAll('.carousel__cell');
		container = document.querySelector('.container') as HTMLElement;

		carousel.cellCount = count;
		carousel.calcContainerSize(container.offsetWidth);
		carousel.cellWidth = Number((cells[0] as HTMLElement).offsetWidth);

		container.style.height = `${carousel.containerHeight}px`;

		changeCarousel();

		// onOrientationChange(Horizontal);
	});

	setTimeout(() => {
		// 최초 실행시, 사용자가 3초라는 긴 시간을 기다리지 않도록 하기 위함
		carousel.setRotateFunction(rotateCarousel);
		animationStart();
	}, 1000);

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
		changeCarousel();
	};

	const optionProps = {
		numberOfCells,
		rotateCarousel,
		changeCarousel,
		onOrientationChange,
		carouselAnimation,
		animationStart,
		// newCreateCount,
	};
</script>

<svelte:window
	on:resize="{() => {
		debounce(resizingContainer, 1000)();
	}}"
/>
<div class="container">
	<div class="scene">
		<div class="carousel">
			{#if datas}
				{#each datas as item (item.id)}
					<div
						class="carousel__cell"
						on:mouseenter="{() => carousel.stopCarouselAnimation()}"
						on:mouseleave="{() => {
							if (!isStop) carouselAnimation();
						}}"
					>
						<div class="flex h-full flex-col items-center justify-between">
							<!-- Group Name -->
							<h2
								class="w-full text-lg font-semibold lg:text-2xl
			">{item.name}</h2
							>
							<!-- On / Total Hosts Number -->

							<p class="font-bold"
								><span class="text-6xl">{item.countHosts.onHosts}</span>
								<span class="relative -bottom-2 w-max text-xl"
									>/ {item.countHosts.totalHosts}</span
								></p
							>
							<!-- Top 5 Datas -->
							<ul class="grid w-full grid-cols-2 gap-4 px-4 text-sm">
								{#each showTopData as topData}
									<li>
										<p class="font-semibold">{topData.toUpperCase()}</p>
										<ol class="space-y-1">
											{#each Object(item.topHosts)[topData] as data (data.id)}
												<li
													class="relative overflow-hidden rounded bg-black bg-opacity-30"
												>
													<p
														class="relative z-[1] flex w-full items-center justify-between rounded border border-white px-0.5 text-black"
														><span
															class="text-rtl inline-block w-2/3 truncate rounded-sm font-medium"
															>{data.name}</span
														>
														<span class="font-semibold">
															{data.data}
														</span></p
													>

													<div
														class="absolute -inset-1 inline-block bg-white bg-opacity-50 "
														style="{`width: ${Number(data.data)}%;`}"
													></div>
												</li>
											{/each}
										</ol>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
<Options carousel="{carousel}" bind:isStop="{isStop}" bind:count="{count}" props="{optionProps}" />
