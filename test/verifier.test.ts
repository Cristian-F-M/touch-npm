import { describe, expect, test } from 'vitest'
import { validateInput } from '@/verifier'

describe('Touch files/folders verifier', () => {
	test('Verify single file with its extension', () => {
		const input = 'main.ts'
		const result = { valid: true }

		expect(validateInput(input)).toEqual(result)
	})

	test('Verify single file with no extension', () => {
		const input = 'main'
		const result = { valid: true }

		expect(validateInput(input)).toEqual(result)
	})

	test('Verify single folder', () => {
		const input = 'main/'
		const result = { valid: true }

		expect(validateInput(input)).toEqual(result)
	})

	test('Verify invalid characters', () => {
		const input = 'main.*'
		const result = { valid: false, error: 'Invalid characters detected' }

		expect(validateInput(input)).toEqual(result)
	})

	test('Verify double dot', () => {
		const input = 'main..ts'
		const result = { valid: false, error: 'Double dot detected' }

		expect(validateInput(input)).toEqual(result)
	})

	test('Verify empty group', () => {
		const input = 'main/{}/'
		const result = { valid: false, error: 'Empty group {} not allowed' }

		expect(validateInput(input)).toEqual(result)
	})

	test('Verify double slash', () => {
		const input = 'main//'
		const result = { valid: false, error: 'Double slash detected' }

		expect(validateInput(input)).toEqual(result)
	})
})
