export const OPEN_SYMBOLS = {
	'{': '{',
	'(': '(',
	'[': '[',
} as const

export const CLOSE_SYMBOLS = {
	'}': '}',
	')': ')',
	']': ']',
} as const

export const SEPARATOR_SYMBOLS = { ',': ',' }
export const FOLDER_INDICATOR_SYMBOLS = { '/': '/', '\\': '\\' } as const

export const EXTENSION_SEPARATORS = { '.': '.' } as const

export const TOKEN_TYPES = {
	WORD: 'word',
	SLASH: 'slash',
	DOT: 'dot',
	COMMA: 'comma',
	OPEN: 'open',
	CLOSE: 'close',
} as const
