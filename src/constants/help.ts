import { version } from '../../package.json'

export const HELP_MESSAGE = `
@cmorales/touch v${version}
Creating complex file structures has never been easier.

Usage:
  touch <input>     Generate file structure    (e.g. touch src/{components,utils})
  touch --help      Show this help message     (e.g. touch --help)
  touch -h          Show this help message     (e.g. touch -h)

Features:
  Directories       Append '/' to name         (e.g. app/models/)
  Grouping          Use {}, [], or ()          (e.g. src/{components,utils})
  Nesting           Nest groups for complexity (e.g. src/{components/{Button,Input},utils})
  Extensions        Per file or default        (e.g. src/{index.ts,styles.css} or src/{a,b}.ts)

Author:
  Cristian Morales (@cmorales)
  GitHub: https://github.com/Cristian-F-M
  Twitter: https://x.com/Morales_M20

Support:
  If you find this useful, support my work:
  https://www.buymeacoffee.com/cmorales
`

export const DOCS_URL =
	'https://github.com/Cristian-F-M/touch-npm?tab=readme-ov-file#cmoralestouch'
