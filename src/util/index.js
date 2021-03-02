export const convertRate = (rate, toFixed) => {
	if (toFixed) {
		return (rate.toHuman().split(',').join('') / 10 ** 18).toFixed(toFixed);
	}
	return rate.toHuman().split(',').join('') / 10 ** 18;
};

// avoid scientific notation "1.2e-5"
export function toPlainString(num) {
	return ('' + +num).replace(
		/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
		function (a, b, c, d, e) {
			return e < 0
				? b + '0.' + Array(1 - e - c.length).join(0) + c + d
				: b + c + d + Array(e - d.length + 1).join(0);
		}
	);
}