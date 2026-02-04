import {
	CLOSE_SYMBOLS,
	EXTENSION_SEPARATORS,
	OPEN_CLOSE_PAIRS,
	OPEN_SYMBOLS,
	SEPARATOR_SYMBOLS,
} from '@/constants/symbols'
import type { CloseSymbol, OpenSymbol, Token } from '@/types/index.d.ts'

export function validateStructure(input: string) {
	const stack: string[] = []
	const pairs: Record<string, string> = {
		'{': '}',
		'[': ']',
		'(': ')',
	}

	for (let i = 0; i < input.length; i++) {
		const char = input[i]!

		if (pairs[char]) {
			stack.push(char)
			continue
		}

		if (Object.values(pairs).includes(char)) {
			const lastStack = stack.pop()
			if (!lastStack || pairs[lastStack] !== char)
				return { valid: false, error: `Unexpected '${char}' at position ${i}` }
		}
	}

	if (stack.length) {
		return {
			valid: false,
			error: `Missing closing '${pairs[stack.at(-1)!]}'`,
		}
	}

	return { valid: true }
}

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
