export class Cipher {
	text: string | undefined;
	encryption: string | undefined;

	constructor(text?: string, encryption?: string) {
		this.text = text;
		this.encryption = encryption;
	}

	get frequencies() {
		const counts: Map<string, number> = new Map();
		if (this.encryption === undefined) {
			return [];
		}

		for (let i = 0; i < this.encryption.length; i++) {
			const letter = this.encryption[i];
			const currentCount = counts.get(letter) || 0;
			counts.set(letter, currentCount + 1);
		}

		return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([letter, count]) => letter);
	}
}