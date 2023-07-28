import { Cipher } from "./Cipher";
// Only supports English alphabet currently
import { alphabet, letterFrequencies, Messagizer } from "../languages/en";
const ALPHABET_LENGTH = alphabet.length;

export class Vigenere extends Cipher {
	constructor(text?: string, encryption?: string) {
		super(text, encryption);
	}
	
	async decrypt(keyword: string, wordsToAdd?: string[]): Promise<string> {
		const messagizer = new Messagizer();
			await messagizer.loadDictionary();
			wordsToAdd?.forEach?.(messagizer.addWords);

		let decryption = '';
		const keywordShifts = keyword.split('').map(l1 => alphabet.findIndex(l2 => l1 === l2));
		let currentShiftIndex = 0;
		this.encryption?.split?.('').forEach((letter) => {
			const letterIndex = alphabet.findIndex(l2 => letter === l2);
			const currentShift = keywordShifts[currentShiftIndex];
			const decryptedLetterIndex = (letterIndex - currentShift + 26) % 26;
			const decryptedLetter = alphabet[decryptedLetterIndex];
			decryption += decryptedLetter;
			currentShiftIndex = (currentShiftIndex + 1) % keywordShifts.length;
		});
		const words = messagizer.splitSentence(decryption, {});

		return Array.isArray(words) ? words.join(' ') : words;
	}
}