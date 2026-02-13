import {
	CLOSE_SYMBOLS,
	EXTENSION_SEPARATORS,
	OPEN_CLOSE_PAIRS,
	OPEN_SYMBOLS,
	SEPARATOR_SYMBOLS
} from '@/constants/symbols'
import type { CloseSymbol, OpenSymbol, Token } from '@/types/verifier'

export function validateInput(input: string) {
	const structure = validateStructure(input)
	const syntaxis = validateSyntax(input)
	if (!structure.valid) return structure
	if (!syntaxis.valid) return syntaxis

	if (/,,/.test(input)) return { valid: false, error: 'Double comma detected' }
	if (/{\s*}/.test(input))
		return { valid: false, error: 'Empty group {} not allowed' }
	if (/\/{2,}/.test(input))
		return { valid: false, error: 'Double slash detected' }
	if (/\/[)}\]]/.test(input))
		return { valid: false, error: 'Empty folder group detected' }

	return { valid: true }
}

export function validateStructure(input: string) {
	const stack: string[] = []
	const pairs: Record<string, string> = {
		'{': '}',
		'[': ']',
		'(': ')'
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
			error: `Missing closing '${pairs[stack.at(-1)!]}'`
		}
	}

	return { valid: true }
}

export function validateSyntax(input: string) {
	const tokens = tokenize(input)
	if (!tokens.length)
		return { valid: false, error: 'Invalid characters detected' }

	if (input.endsWith('.'))
		return { valid: false, error: 'Extension cannot be empty' }

	const stack: string[] = []

	for (let i = 0; i < tokens.length; i++) {
		const t = tokens[i]!
		const prevT = tokens[i - 1]
		const nextT = tokens[i + 1]

		if (t.type === 'open') {
			if (i > 0 && prevT?.type !== 'slash')
				return {
					valid: false,
					error: `Group '${t.value}' must be preceded by '/' at position ${i}`
				}
			stack.push(t.value)
		}

		if ([t.type, prevT?.type].every((t) => t === 'comma'))
			return {
				valid: false,
				error: 'Double comma detected'
			}

		if (
			t.type === 'slash' &&
			(nextT?.type === 'comma' ||
				nextT?.type === 'close' ||
				nextT?.type === 'dot')
		)
			return { valid: false, error: `Invalid "/" position at ${i}` }

		if (t.type === 'close') {
			const lastStack = stack.pop() as OpenSymbol

			if (!lastStack || OPEN_CLOSE_PAIRS[lastStack] !== t.value)
				return { valid: false, error: `Unexpected "${t.value}"` }
		}
	}

	if (stack.length) return { valid: false, error: 'Unclosed group detected' }

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
