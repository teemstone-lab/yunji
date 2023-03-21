module.exports = (limit: number, isOn?: boolean) => {
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
