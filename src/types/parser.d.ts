import type { NodeTypes } from '@/constants/parser'

export type NodeType = typeof NodeTypes

export type Node =
	| { type: NodeType['DIR']; name: string; children: Node[] }
	| { type: NodeType['FILE']; name: string }
