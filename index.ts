// import { Caesar } from "./ciphers/Caesar";
// import { Vigenere } from "./ciphers/Vigenere";
// import { Polybius } from "./ciphers/Polybius";

async function runCiphers() {
	// const encryption1 = 'kluhtlishjrvbadvyyplkaohavbyjpwolypzavvdlhrvuuleatlzzhnlzdpajoavcpnlulyljpwolyrlfdvykpzaolopkkluzftivsvmklhaoputfmhcvypalovsilpuluk';
	// const encryption2 = 'vwduwljudeehghyhubwklqjlfrxogilqgsohdvhuhwxuqdqbeoxhsulqwviruydxowdqgdodupghvljqedvhgrqzklfkedqnbrxghflghrqldpvhwwlqjxsvdihkrxvhfr';
	// const cipher1 = new Caesar(undefined, encryption1);
	// const cipher2 = new Caesar(undefined, encryption2);
	
	// const res1 = await cipher1.decrypt(undefined, ['vigenere', 'holbein']);
	// const res2 = await cipher2.decrypt(undefined, ['vigenere', 'holbein']);
	// console.log('\n' + res2 + res1 + '\n');
	
	
	// const vEncryption = 'klkbnqlcytfysryucocphgbdizzfcmjwkuchzyeswfogmmetwwossdchrzyldsbwnydednzwnefydthtddbojicemlucdygicczhoadrzcylwadsxpilpiecskomoltejtkmqqymehpmmjxyolwpeewjckznpccpsvsxauyodhalmriocwpelwbcniyfxmwjcemcyrazdqlsomdbfljwnbijxpddsyoehxpceswtoxwbleecsaxcnuetzywfn'
	// const cipher3 = new Vigenere(undefined, vEncryption);
	// const res3 = await cipher3.decrypt('sskkuullll');
	// console.log(res3 + '\n');
	
	
	// const pEncryption = '44541134541123335344541242434244325141212311311353155442544244424344325141534354324234411125513553341342432253431144543453432251343142143251341253341215541534513351444411225144425442444415345123551543213451111311212351425431533321424351445315341434512542531544335154325341443343513544';
	// const cipher4 = new Polybius(undefined, pEncryption);
	// const res4 = await cipher4.decrypt();
	// console.log(res4 + '\n');


	// const dials = `20 33 22 21 00 33 30 01 02`;
	const dials = `20 33 22 21 00 33 30 01 02 20 22 02 32 20 11 33 03 30 03 32 03 00 22 01 33 23
	23 10 03 22 13 13 20 01 11 03 22 20 20 20 22 33 20 13 23 13 33 22
	30 33 01 20 21 10 12 11 00 32 23 13 22 02 00 10 31 02 23 20 31 03 12
	01 11 33 32 23 02 01 00 32 10 10 30 01 10 23 31 10 02 00 30 23 31 10
	03 03 01 02 33 02 23 21 30 12 03 12 22 00 03 13 31 00 10 11 21 03 23 02
	20 13 02 32 30 31 23 33 20 02 12 33 30 00 30 12 30 13 03 01 03 03
	23 22 02 30 20 03 22 23 32 23 02 02 31 20 23 13 30 02`;

	const decimalDials = dials
		// split on whitespace
		.split(/\s+/)
		// convert to decimal
		.map(d => parseInt(d, 4));

	const binary = decimalDials.map(d => {
		// convert to binary
		let no = (d >>> 0).toString(2);
		while (no.length < 4) {
			no = '0' + no;
		}
		return no;
	}).join('').split('');

	const newspaper = 'The whole grain goodness of blue chip dividend stocks has its limits. Utility stocks, consumer staples, pipelines, telecoms, and real estate investment trusts have all lost ground over the past month, even while the broader market has been flat. With the bond market signalling an expectation of rising interest rates, the five-year rally for steady blue-chip dividend payers has stalled. Should you be scared if you own a lot of these stocks, either directly or through mutual funds or exchange-traded-funds? David Baskin, president of Baskin Financial Services, has a two-pronged answer: Keep your top-quality dividend stocks, but be prepared to follow his firm\'s example in trimming holdings in stocks such as TransCanada Corp., Keyera Corp., and Pembina Pipeline Corp. Lets have Mr Baskin run us through his thinking on dividend stocks, which are a big part of the portfolios his firm puts together for clients.'
	const newspaperChars = newspaper.toLowerCase().split(/[^a-z0-9]+/).join('').split('').slice(0, binary.length);
	const newspaperBinary = newspaperChars.map(char => 'aeiou'.includes(char) ? '1' : '0');

	let finalBinary = ''
	for (let i = 0; i < binary.length; i++) {
		const b1 = binary[i];
		const b2 = newspaperBinary[i];
		finalBinary += (b1 === b2 ? '0' : '1');
	}

	console.log(finalBinary.length);

	const binarySixes: string[] = [];
	for (let i = 0; i < finalBinary.length; i += 3) {
		binarySixes.push(finalBinary.slice(i, i + 3));
	}

	console.log(binarySixes.join('\n'))


	const baseSixes = binarySixes.map(binary => parseInt(binary, 2).toString(6));
	const polybiusPairs: number[][] = [];
	for (let i = 0; i < baseSixes.length; i += 2) {
		const first = parseInt(baseSixes[i], 10);
		const second = parseInt(baseSixes[i + 1], 10);
		polybiusPairs.push([first, second]);
	}

	console.log(polybiusPairs.join('\n'))

	const polybiusSquare = [
		['f', 'g', 'h', 'i', 'j', 'k'],
		['e', 'x', 'y', 'z', '0', 'l'],
		['d', 'w', '7', '8', '1', 'm'],
		['c', 'v', '6', '9', '2', 'n'],
		['b', 'u', '5', '4', '3', 'o'],
		['a', 't', 's', 'r', 'q', 'p'],
	];

	console.log(polybiusPairs.map(([y, x]) => polybiusSquare?.[y]?.[x] ?? '').join(''));
	'startcibcbqnkseeschematicsforalarmandvaulthitkwortowax12amaftcralarmtestvaultco7ehs5567meetatblackuuten7'
	'start city bank see schematics for alarm and vault hitkwortowax 12am after alarm test vault code hs5567 meet at black out end'

	return 'done';
}

runCiphers().then(console.log)
