import { Cipher } from "./Cipher";
// Only supports English alphabet currently
import { alphabet, letterFrequencies, Messagizer } from "../languages/en";
const ALPHABET_LENGTH = alphabet.length;

const square: string[][] = [];
for (let y = 0; y < 5; y++) {
	const row: string[] = [];
	for (let x = 0; x < 5; x++) {
		row.push(alphabet[(y * 5) + x]);
	}
	square.push(row);
}

export class Polybius extends Cipher {
	constructor(text?: string, encryption?: string) {
		super(text, encryption);
	}
	
	async decrypt(wordsToAdd?: string[]): Promise<string> {
		const messagizer = new Messagizer();
		await messagizer.loadDictionary();
		wordsToAdd?.forEach?.(messagizer.addWords);

		if (!this.encryption) return '';

		let decryption = '';
		for (let i = 0; i < this.encryption.length; i += 2) {
			const x = parseInt(this.encryption[i], 10) - 1;
			const y = parseInt(this.encryption[i + 1], 10) - 1;
			decryption += square[y][x];
		}		
		const words = messagizer.splitSentence(decryption, {});

		return Array.isArray(words) ? words.join(' ') : words;
	}
}