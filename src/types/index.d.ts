import type {
	CLOSE_SYMBOLS,
	OPEN_SYMBOLS,
	TOKEN_TYPES,
} from '@/constants/symbols'

export type OpenSymbol = keyof typeof OPEN_SYMBOLS
export type CloseSymbol = keyof typeof CLOSE_SYMBOLS

export type TokenType = typeof TOKEN_TYPES

export type Token =
	| { type: TokenType['WORD']; value: string }
	| { type: TokenType['SLASH'] }
	| { type: TokenType['DOT'] }
	| { type: TokenType['COMMA'] }
	| { type: TokenType['OPEN']; value: OpenSymbol }
	| { type: TokenType['CLOSE']; value: CloseSymbol }
