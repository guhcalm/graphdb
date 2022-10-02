import { randomUUID } from "node:crypto"

type Type = string
type Identity = string | number
type Data = any
type Metadata = { type: Type; identity: Identity }

type Relationship = {
  metadata: Metadata
  data?: Data
  origin: Metadata
  target: Metadata
}

type Entity = {
  metadata: Metadata
  data?: Data
  relationships: Map<Type, Map<Identity, Relationship>>
}

type AdjacencyList = Map<Type, Map<Identity, Entity>>

type Graph = {
  get (dto?: Metadata): AdjacencyList | Entity | void
  set (...dto: ({ 
      type: Type 
      data?: Data
      identity?: Identity 
    } | { 
      origin: Metadata
      target: Metadata 
      relationship: { type: Type; data?: Data; identity?: Identity } 
    })[]): Graph
}

export default (adjacencyList: AdjacencyList = new Map()): Graph => ({
  get: dto => dto ? adjacencyList?.get(dto.type)?.get(dto.identity) : adjacencyList,
  set (...dtos) {
    dtos.forEach(dto => {
      try {
        if ("type" in dto && "data" in dto) {
          const { type, data, identity = randomUUID() } = dto
          !adjacencyList.get(type) && adjacencyList.set(type, new Map())
          adjacencyList.get(type)?.set(identity, <Entity>{
            metadata: { type, identity },
            ...(data && { data }),
            relationships: new Map()
          })
        } else if ("origin" in dto && "relationship" in dto && "target" in dto) {
          const { 
            origin, 
            relationship: { type, data, identity = randomUUID() }, 
            target 
          } = dto
          const { relationships } = <Entity> adjacencyList.get(origin.type)?.get(origin.identity)
          !relationships.get(type) && relationships.set(type, new Map())
          relationships.get(type)?.set(identity, <Relationship>{
            metadata: { type, identity },
            ...(data && { data }),
            origin,
            target
          })
        }
      } catch (exception) {
        exception instanceof Error ? console.error({ error: exception.message }) : console.error({ exception })
      }
    })
    return this
  }
})
