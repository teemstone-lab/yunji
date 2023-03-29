<style>
	.container {
		margin: 0 auto;
		width: 100%;
		height: 100%;
		position: relative;
		padding: 100px 0;
	}

	.scene {
		border: 1px solid #ccc;
		position: relative;
		width: 420px;
		height: 470px;
		margin: 0 auto;
		perspective: 78vw;
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
		width: 400px;
		height: 450px;
		left: 10px;
		top: 10px;
		border: 2px solid black;
		line-height: 250px;
		font-size: 80px;
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

	.carousel-options {
		text-align: center;
		position: relative;
		z-index: 2;
		background: hsla(0, 0%, 100%, 0.8);
	}
	.nextPrevBtn {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		gap: 400px;
	}
	.next,
	.prev {
		color: #000;
		padding: 1em 2em;
		cursor: pointer;
		background: #fbfbfb;
		border-radius: 5px;
		opacity: 0.4;
		border: 1px solid #7f7f7f;
		transition: opacity 0.1s, top 0.1s;
	}
	.next:hover,
	.prev:hover {
		opacity: 0.8;
	}
	.next:active,
	.prev:active {
		top: 104px;
		box-shadow: 0 1px 0 #999;
	}
	.next {
		right: 5em;
	}
	.prev {
		left: 5em;
	}
</style>

<script lang="ts">
	import { Carousel, CellViewType } from '../components/carousel/carousel';
	import { onMount } from 'svelte';

	enum PrevNext {
		prev = 'prev',
		next = 'next',
	}

	const random = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	let count: number = random(5, 20);

	const carousel = new Carousel(count);

	let carouselEl: HTMLElement;
	let cells: NodeListOf<Element>;
	let cellsRange: HTMLInputElement;
	let orientationRadios: NodeListOf<Element>;

	const rotateCarousel = () => {
		carousel.rotateCarousel();

		if (carouselEl) {
			const checkCurrentIndex = carousel.selectedIndex > carousel.cellCount;

			if (checkCurrentIndex) {
				carouselEl.style.transition = 'none';

				carousel.resetAngle(rotateCarousel);
			} else {
				carouselEl.style.transition = 'transform 1s';
			}
			carouselEl.style.transform = `translateZ(${carousel.translateZ}vw) ${carousel.carouselDirection}(${carousel.angle}deg)`;
		}
	};

	const changeCarousel = () => {
		carousel.cellCount = Number(cellsRange.value);

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

	const changeCount = (min: number, max: number) => {
		const newCount = random(min, max);
		cellsRange.value = String(newCount);
		carousel.cellCount = newCount;
		changeCarousel();
	};

	onMount(() => {
		carouselEl = document.querySelector('.carousel') as HTMLElement;
		cells = carouselEl && carouselEl.querySelectorAll('.carousel__cell');
		cellsRange = document.querySelector('.cells-range') as HTMLInputElement;
		orientationRadios = document.querySelectorAll('input[name="orientation"]');

		cellsRange.addEventListener('change', changeCarousel);
		cellsRange.addEventListener('input', changeCarousel);

		const onOrientationChange = () => {
			let checkedRadio = document.querySelector(
				'input[name="orientation"]:checked',
			) as HTMLInputElement;
			carousel.toggleHorizontal(checkedRadio.value as CellViewType);
			changeCarousel();
		};

		(function () {
			for (let i = 0; i < orientationRadios.length; i++) {
				let radio = orientationRadios[i];
				radio.addEventListener('change', onOrientationChange);
			}
		})();

		onOrientationChange();
	});

	setTimeout(() => {
		// 최초 실행시, 사용자가 3초라는 긴 시간을 기다리지 않도록 하기 위함
		animationStart();
	}, 1000);

	const cellItems = Array(20)
		.fill(0)
		.map((_, i) => i + 1);
</script>

<div class="container">
	<div class="scene">
		<div class="carousel">
			{#each cellItems as item}
				<div
					class="carousel__cell"
					on:mouseenter="{() => carousel.stopCarouselAnimation()}"
					on:mouseleave="{() => carouselAnimation()}">{item}</div
				>
			{/each}
		</div>
	</div>
	<div class="nextPrevBtn">
		{#each Object.values(PrevNext) as button}
			<button
				class="{String(button)}"
				on:click="{() => {
					if (button === PrevNext.next) {
						carousel.selectedIndex++;
					} else {
						carousel.selectedIndex--;
					}
					rotateCarousel();
					carouselAnimation();
				}}">{button}</button
			>
		{/each}
	</div>
	<div class="carousel-options">
		<p>
			<label>
				Cells
				<input class="cells-range" type="range" min="5" max="20" value="{count}" />
			</label>
		</p>
		<p>
			<button type="button" class="border" on:click="{() => changeCount(5, 20)}">NEW</button>
			<button type="button" class="border" on:click="{() => carousel.stopCarouselAnimation()}"
				>STOP</button
			>
			<button type="button" class="border" on:click="{animationStart}">START</button>
		</p>

		<p>
			Orientation:
			<label>
				<input type="radio" name="orientation" value="{CellViewType.Horizontal}" checked />
				horizontal
			</label>
			<label>
				<input type="radio" name="orientation" value="{CellViewType.Vertical}" />
				vertical
			</label>
		</p>
	</div>
</div>
