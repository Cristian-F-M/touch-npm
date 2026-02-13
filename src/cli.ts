import { build } from '@/builder'
import { error } from '@/logger'
import { getExtension, parse } from '@/parser'
import { validateInput } from '@/verifier'
import { showFlagsInfo } from './utils'

export const args = process.argv.slice(2)

await showFlagsInfo(args)

const input = args[0]!.replace(/\s/g, '')
const validation = validateInput(input)

if (!validation.valid) {
	error(validation.error!)
	process.exit(1)
}

const tree = parse(input)
const ext = getExtension(input)

build(tree, process.cwd(), ext)
