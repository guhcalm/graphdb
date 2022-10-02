import { randomUUID } from "crypto"
import seed from "./seed"

type Metadata = { type: string; identity: string }

type Relationship = {
  metadata: Metadata
  data?: any
  target: Metadata
}

type Entity = {
  metadata: Metadata
  data: any
  relationships: Map<string, Map<string, Relationship>>
}

type AdjacencyList = Map<string, Map<string, Entity>>

const Graph = (adjacencyList: AdjacencyList= new Map) => <const>{
  get: () => adjacencyList,
  addEntity (type: string, data: any, identity = randomUUID()) {
    !adjacencyList.get(type) && adjacencyList.set(type, new Map())
    adjacencyList.get(type)?.set(identity, <Entity> { 
      metadata: { type, identity },
      data,
      relationships: new Map()
    })
  },
  addRelationship ({ type, identity = randomUUID() }: Metadata, target: Metadata, data?: any) {
    const { relationships } = adjacencyList.get(target.type)?.get(target.identity)!
    !relationships.get(type) && relationships.set(type, new Map())
    relationships.get(type)?.set(identity, <Relationship> {
      metadata: { type, identity },
      ...(data && { data }),
      target
    })
  }
}

{
  const seedGraph = Graph()
  Object.entries(seed).forEach(([ type, datas ]) => 
    datas.forEach(data => seedGraph.addEntity(type, data, data))
  )
  console.log(seedGraph.get())
}