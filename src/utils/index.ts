import { COMMANDS } from '@/constants/help'

export async function showFlagsInfo(args: string[]) {
	for (const command of Object.values(COMMANDS)) {
		if (!command.flags.some((flag) => args.includes(flag))) continue
		await command.run()
		process.exit(0)
	}

	if (!args.length) COMMANDS.help.run()
	process.exit(0)
}
