import open from 'open'
import { build } from '@/builder'
import { DOCS_URL, HELP_MESSAGE } from '@/constants/help'
import { error, log } from '@/logger'
import { getExtension, parse } from '@/parser'
import { validateInput } from '@/verifier'

const args = process.argv.slice(2)

if (!args.length || args.includes('--help') || args.includes('-h')) {
	console.log(HELP_MESSAGE)
	process.exit(0)
}

if (args.includes('--docs') || args.includes('-d')) {
	log(`Opening ${DOCS_URL}`)
	await open(DOCS_URL, { wait: true })
	process.exit(0)
}

const input = args[0]!.replace(/\s/g, '')
const validation = validateInput(input)

if (!validation.valid) {
	error(validation.error!)
	process.exit(1)
}

const tree = parse(input)
const ext = getExtension(input)

build(tree, process.cwd(), ext)
