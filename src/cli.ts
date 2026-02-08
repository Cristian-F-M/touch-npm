import { build } from '@/builder'
import { error } from '@/logger'
import { getExtension, parse } from '@/parser'
import { validateInput } from '@/verifier'

const args = process.argv.slice(2)

if (!args.length) process.exit(1)

const input = args[0]!.replace(/\s/g, '')
const validation = validateInput(input)

if (!validation.valid) {
	error(validation.error!)
	process.exit(1)
}

const tree = parse(input)
const ext = getExtension(input)

build(tree, process.cwd(), ext)

