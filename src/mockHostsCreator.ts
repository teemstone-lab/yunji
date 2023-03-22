export const mockHostsCreator = (limit: number, isOn?: boolean) => {
	const numberChecker = (num: number) => {
		const checkNumSize = Math.round(num) === 1 ? true : false;
		return checkNumSize;
	};

	const hosts = [];
	for (let i = 0; i < limit; i++) {
		hosts.push({ name: i + 1, isOn: isOn ? isOn : numberChecker(Math.random()) });
	}
	return hosts;
};
// module.exports = function mockHostsCreator(limit: number, isOn?: boolean) {
// 	const numberChecker = (num: number) => {
// 	const checkNumSize = Math.round(num) === 1 ? true : false;
// 	return checkNumSize;
// };

// const hosts = [];
// for (let i = 0; i < limit; i++) {
// 	hosts.push({ name: i + 1, isOn: isOn ? isOn : numberChecker(Math.random()) });
// }
// return hosts;
// };
