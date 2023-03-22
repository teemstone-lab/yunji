function fibonacci(n: number): number {
	if (n <= 1) return n;
	return fibonacci(n - 1) + fibonacci(n - 2);
}

self.onmessage = function (event: MessageEvent<{ n: number }>) {
	const { n } = event.data;
	const startTime = performance.now();
	const result = fibonacci(n);
	const endTime = performance.now();

	const elapsedTime = endTime - startTime;
	self.postMessage({ result, elapsedTime });
};
