import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";

readFileSync("src/RESPOSTAS.csv").toString().split("\r\n").map(line => line.split(";")).forEach(
  ([,,,, nome,,,, idade, address, ...questions]) => {
    if (!nome) return 
    console.dir(
      { nome: nome.toUpperCase().split(" ").map(item => item[0]).join("."), idade: Number(idade), address, questions }
    )
  }
)

type Type = string
type Identity = string
type Metadata = { type: Type; identity: Identity }

type Edge = {
  data?: any
  origin: Metadata
  target: Metadata
} 

type Node = {
  data: any
  edges: Map<Type, Map<Identity, Edge>>
}

type AdjacencyList = Map<Type, Map<Identity, Node>>

type Graph = {
  get(dto?: Metadata): AdjacencyList | Node | void
  set(...dto: ({
      type: Type; 
      data: any
      identity?: Identity; 
    } | {
      origin: Metadata
      target: Metadata
      relationship: { type: Type; identity?: Identity; data?: any }
    })[]): Graph
}

export default (adjacencyList: AdjacencyList = new Map()): Graph => ({
  get: dto => dto ? adjacencyList.get(dto.type)?.get(dto.identity) : adjacencyList,
  set (...dto) {
    dto.forEach(item => {
      try {
        if ("type" in item && "data" in item ) {
          const { type, data, identity = randomUUID() } = item
          !adjacencyList.get(type) && adjacencyList.set(type, new Map())
          adjacencyList.get(type)?.set(identity, <Node> {
            ...(data && { data }),
            edges: new Map()
          })
        } else if ("origin" in item && "target" in item && "relationship" in item ) {
          const { origin, target, relationship: { type, data, identity = randomUUID() } } = item
          const { edges } = adjacencyList.get(origin.type)?.get(origin.identity)!
          !edges.get(type) && edges.set(type, new Map())
          edges.get(type)?.set(identity, <Edge> {
            ...(data && { data }),
            origin,
            target
          })
        }
      } catch (exception) {
        exception instanceof Error
          ? console.error({ error: exception.message })
          : console.error({ exception })
      }
    })
    return this
  }
})