import type { Node } from '@/types/parser'
import {
	CLOSE_SYMBOLS,
	FOLDER_INDICATOR_SYMBOLS,
	OPEN_CLOSE_PAIRS,
	OPEN_SYMBOLS,
	SEPARATOR_SYMBOLS
} from './constants/symbols'
import type { OpenSymbol } from './types/verifier'

export function parse(input: string) {
	let i = 0

	function walk(): Node {
		let name = ''
		let char = input[i]

		while (
			i < input.length &&
			!Object.hasOwn(
				Object.assign(
					{},
					OPEN_SYMBOLS,
					CLOSE_SYMBOLS,
					SEPARATOR_SYMBOLS,
					FOLDER_INDICATOR_SYMBOLS
				),
				char!
			)
		) {
			name += char
			char = input[++i]
		}

		if (Object.hasOwn(FOLDER_INDICATOR_SYMBOLS, char ?? '')) {
			i++
			char = input[i]

			if (!Object.hasOwn(OPEN_SYMBOLS, char ?? '')) {
				const children: Node[] = []

				if (
					i < input.length &&
					!Object.hasOwn(SEPARATOR_SYMBOLS, input[i]!) &&
					!Object.hasOwn(CLOSE_SYMBOLS, input[i]!)
				)
					children.push(walk())

				return { type: 'dir', name: name.trim(), children }
			}
		}

		name.trim()

		if (Object.hasOwn(OPEN_SYMBOLS, char ?? '')) {
			const opener = input[i++] as OpenSymbol
			const closer = OPEN_CLOSE_PAIRS[OPEN_SYMBOLS[opener]]

			const children: Node[] = []

			char = input[i]

			while (i < input.length && char !== closer) {
				children.push(walk())
				if (input[i] === ',') i++
				char = input[i]
			}

			i++

			return { type: 'dir', name, children }
		}

		return { type: 'file', name }
	}

	return walk()
}
