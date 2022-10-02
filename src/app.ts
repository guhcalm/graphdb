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
  relationships: {
    [relationshipType: string]: {
      [relationshipIdentity: string]: Relationship
    }
  }
}

type AdjacencyList = {
  [entityType: string]: {
    [entityIdentity: string]: Entity
  }
}

const createAdjacencyList = (adjacencyList = <AdjacencyList>{}) => <const>{
  get: () => adjacencyList,
  addEntity (type: string, data: any, identity = randomUUID()) {
    const entity: Entity = { 
      metadata: { type, identity },
      data,
      relationships: {}
    }
    adjacencyList[type] = { ... adjacencyList[type], [identity]: entity }
  },
  addRelationship ({ type, identity = randomUUID() }: Metadata, target: Metadata, data?: any) {
    const relationship: Relationship = {
      metadata: { type, identity },
      ...(data && { data }),
      target
    }
    adjacencyList[target.type][target.identity].relationships[type] = {
      ... adjacencyList[target.type][target.identity].relationships[type],
      [identity]: relationship
    }
  }
}

console.log(createAdjacencyList().get())