import { Big, BigSource } from 'big.js';

/**
 * By Matt Brzycki
 *
 * w * 36 / (37 - r)
 */
export const calcRepetitionMaximum = (weight: BigSource, repeats: BigSource): Big => {
	const w = new Big(weight);
	const r = new Big(repeats);

	if (!w || !r || w.lte(0) || r.lte(0) || r.gte(37)) {
		return new Big(0);
	}

	const subtractedReps = new Big(37).minus(r);
	const result = w.mul(36).div(subtractedReps);
	return result.round();
};
