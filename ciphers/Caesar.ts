import { Cipher } from "./Cipher";
// Only supports English alphabet currently
import { alphabet, letterFrequencies, Messagizer } from "../languages/en";
const ALPHABET_LENGTH = alphabet.length;

export class Caesar extends Cipher {
	constructor(text?: string, encryption?: string) {
		super(text, encryption);
	}

	encrypt(_shift?: number): string {
		let shift: number;
		if (!_shift) {
			// if no shift is provided, give a random shift that is not a multiple of ALPHABET_LENGTH
			shift = Math.floor(Math.random() * (ALPHABET_LENGTH - 1)) + 1;
		} else if (_shift % ALPHABET_LENGTH === 0) {
			throw new Error(`this shift is a multiple of ${ALPHABET_LENGTH} and will not encrypt the plain text.`);
		} else {
			shift = _shift;
		}

		if (!this.text) {
			throw new Error('nothing to encrypt');
		}

		this.encryption = this.text.split('').map((char) => {
			const index = alphabet.findIndex(letter => letter === char);
			if (index >= 0) {
				const encryptIndex = (index + shift) % ALPHABET_LENGTH;
				return alphabet[encryptIndex];
			}
			return char;
		}).join('');

		return this.encryption;
	}
	
	async decrypt(shift?: number, wordsToAdd?: string[]): Promise<string> {
		if (!this.encryption) {
			throw new Error('nothing to decrypt');
		} else if (shift === undefined) {
			// load dictionary 
			const messagizer = new Messagizer();
			await messagizer.loadDictionary();
			wordsToAdd?.forEach(messagizer.addWords);
			// Brute force by letter frequency
			const [mostFrequentEncryptedLetter] = this.frequencies;
			const mostFrequentEncryptedIndex = alphabet.findIndex(letter => letter === mostFrequentEncryptedLetter);
			let bestSolve: string | string[] = [];
			for (let i = 0; i < letterFrequencies.length; i++) {
				const { letter } = letterFrequencies[i];
				const letterIndex = alphabet.findIndex(l => l === letter);
				const shift = (mostFrequentEncryptedIndex - letterIndex + 26) % 26;
				if (shift % 26 === 0) continue;
				const decryptedText = await this.decrypt(shift);
				let words = messagizer.splitSentence(decryptedText, {});
				if (bestSolve.length === 0 || bestSolve.length > words.length) bestSolve = words;
			}
			return Array.isArray(bestSolve) ? bestSolve.join(' ') : bestSolve;
		} else if (shift % ALPHABET_LENGTH === 0) {
			throw new Error(`this shift is a multiple of ${ALPHABET_LENGTH} and will not decrypt the encryption.`);
		} else {
			this.text = this.shift(this.encryption, shift);
			return this.text;
		}
	}

	shift(_text: string, shift: number): string {
		const text = _text.split('').map((char) => {
			const index = alphabet.findIndex(letter => letter === char);
			if (index >= 0) {
				const decryptedIndex = (((index - shift) % ALPHABET_LENGTH) + ALPHABET_LENGTH) % ALPHABET_LENGTH;
				return alphabet[decryptedIndex];
			}
			return char;
		}).join('');

		return text;
	}
}