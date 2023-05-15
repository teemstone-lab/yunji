/**
 * 지정 범위 내에서 랜덤한 숫자를 출력하는 함수
 * @param {number} limit - 지정 범위 (default 100)
 */
export default function randomNumber(limit: number = 100) {
	const checkNumSize = Math.floor(Math.random() * limit + 1);
	return checkNumSize;
}
