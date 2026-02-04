import {
	CLOSE_SYMBOLS,
	EXTENSION_SEPARATORS,
	OPEN_SYMBOLS,
	SEPARATOR_SYMBOLS,
} from '@/constants/symbols'
import type { CloseSymbol, OpenSymbol, Token } from '@/types/index.d.ts'

function tokenize(input: string) {
	const tokens: Token[] = []

	let buffer = ''

	const flush = () => {
		if (!buffer) return

		tokens.push({ type: 'word', value: buffer })
		buffer = ''
	}

	for (const char of input) {
		if (/\w|-/.test(char)) {
			buffer += char
			continue
		}

		flush()

		if (char === '/') tokens.push({ type: 'slash' })
		else if (char === EXTENSION_SEPARATORS['.']) tokens.push({ type: 'dot' })
		else if (char === SEPARATOR_SYMBOLS[',']) tokens.push({ type: 'comma' })
		else if (Object.hasOwn(OPEN_SYMBOLS, char))
			tokens.push({ type: 'open', value: char as OpenSymbol })
		else if (Object.hasOwn(CLOSE_SYMBOLS, char))
			tokens.push({ type: 'close', value: char as CloseSymbol })
		else return []
	}

	flush()

	return tokens
}
