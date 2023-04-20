/**
 * hex to rgb
 * @param {string} hexColor hex
 * @param {number} opacity 0 ~ 100
 */
export default function hexToRgb(hexColor: string, opacity?: number) {
	const hex = hexColor.trim().replace('#', '');
	const rgb = hex.length === 3 ? hex.match(/[a-f\d]/gi) : hex.match(/[a-f\d]{2}/gi);

	rgb?.forEach((str, x, arr) => {
		if (str.length == 1) {
			str = str + str;
		}
		arr[x] = String(parseInt(str, 16));
	});

	return `rgb(${rgb!.join(', ')}${opacity ? `, ${opacity / 100}` : ''})`;
}
