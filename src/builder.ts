import fs from 'node:fs'
import path from 'node:path'
import { log, success, warn } from '@/logger'
import type { Node } from '@/types/parser'

export function build(tree: Node, base: string, defaultExt = '') {
	let files = 0
	let dirs = 0

	function walk(node: Node, current: string) {
		if (node.type === 'dir') {
			const dirPath = path.join(current, node.name)

			if (!fs.existsSync(dirPath)) {
				fs.mkdirSync(dirPath, { recursive: true })
				dirs++
			}

			// biome-ignore lint/suspicious/useIterableCallbackReturn: It does not matter
			node.children?.forEach((c) => walk(c, dirPath))
		}

		let file = node.name

		if (!fs.existsSync(file) && defaultExt) file += defaultExt

		const filePath = path.join(current, file)

		if (fs.existsSync(filePath)) return warn(`exists: ${filePath}`)

		fs.writeFileSync(filePath, '')
		log(`created: ${filePath}`)
		files++
	}

	walk(tree, base)

	success(`\n✔ Created ${files} files and ${dirs} folders\n`)
}
