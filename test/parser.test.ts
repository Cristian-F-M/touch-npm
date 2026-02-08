import { describe, expect, test } from 'vitest'
import { parse } from '@/parser'

describe('Touch files/folders creator', () => {
	test('Parse single file with its extension', () => {
		const input = 'main.ts'
		const result = { type: 'file', name: 'main.ts' }

		expect(parse(input)).toEqual(result)
	})

	test('Parse single file with no extension', () => {
		const input = 'main'
		const result = { type: 'file', name: 'main' }

		expect(parse(input)).toEqual(result)
	})

	test('Parse a single folder', () => {
		const input = 'app/'
		const result = { type: 'dir', name: 'app', children: [] }

		expect(parse(input)).toEqual(result)
	})

	test('Parse nested folders', () => {
		const input = 'app/models/'
		const result = {
			type: 'dir',
			name: 'app',
			children: [{ type: 'dir', name: 'models', children: [] }]
		}

		expect(parse(input)).toEqual(result)
	})

	test('Parse nested files and folders ', () => {
		const input = 'app/models/User.ts'

		const result = {
			type: 'dir',
			name: 'app',
			children: [
				{
					type: 'dir',
					name: 'models',
					children: [{ type: 'file', name: 'User.ts' }]
				}
			]
		}

		expect(parse(input)).toEqual(result)
	})

	test('Parse complex input, with nested files, file grouping, custom extension, default extension and using "{}" as grouping symbol', () => {
		const input = 'project/app/{index.js, models/User, utils/{global.ts}}.ts'

		const result = {
			type: 'dir',
			name: 'project',
			children: [
				{
					type: 'dir',
					name: 'app',
					children: [
						{
							type: 'file',
							name: 'index.js'
						},
						{
							type: 'dir',
							name: 'models',
							children: [
								{
									type: 'file',
									name: 'User'
								}
							]
						},
						{
							type: 'dir',
							name: 'utils',
							children: [
								{
									type: 'file',
									name: 'global.ts'
								}
							]
						}
					]
				}
			]
		}

		expect(parse(input)).toEqual(result)
	})

	test('Parse complex input, with nested files, file grouping, custom extension, default extension and using "()" as grouping symbol', () => {
		const input = 'project/app/(index.js, models/User, utils/(global.ts)).ts'

		const result = {
			type: 'dir',
			name: 'project',
			children: [
				{
					type: 'dir',
					name: 'app',
					children: [
						{
							type: 'file',
							name: 'index.js'
						},
						{
							type: 'dir',
							name: 'models',
							children: [
								{
									type: 'file',
									name: 'User'
								}
							]
						},
						{
							type: 'dir',
							name: 'utils',
							children: [
								{
									type: 'file',
									name: 'global.ts'
								}
							]
						}
					]
				}
			]
		}

		expect(parse(input)).toEqual(result)
	})

	test('Parse complex input, with nested files, file grouping, custom extension, default extension and using "[]" as grouping symbol', () => {
		const input = 'project/app/[index.js, models/User, utils/[global.ts]].ts'

		const result = {
			type: 'dir',
			name: 'project',
			children: [
				{
					type: 'dir',
					name: 'app',
					children: [
						{
							type: 'file',
							name: 'index.js'
						},
						{
							type: 'dir',
							name: 'models',
							children: [
								{
									type: 'file',
									name: 'User'
								}
							]
						},
						{
							type: 'dir',
							name: 'utils',
							children: [
								{
									type: 'file',
									name: 'global.ts'
								}
							]
						}
					]
				}
			]
		}

		expect(parse(input)).toEqual(result)
	})
})
