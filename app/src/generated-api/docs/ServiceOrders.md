
# ServiceOrders

Representação completa de ordem de serviço para veiculos, com detalhes granulares sobre o tipo e prioridade da manutenção.

## Properties

Name | Type
------------ | -------------
`id` | string
`vehicleId` | string
`userId` | string
`status` | string
`type` | string
`category` | string
`maintenanceNature` | string
`impact` | string
`priority` | string
`description` | string
`serviceDate` | Date
`cost` | number
`createdAt` | Date

## Example

```typescript
import type { ServiceOrders } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "vehicleId": a1b2c3d4-e5f6-7890-1234-567890abcdef,
  "userId": f0e9d8c7-b6a5-4321-fedc-ba9876543210,
  "status": null,
  "type": internal,
  "category": chassis_and_suspension,
  "maintenanceNature": corrective,
  "impact": blocking,
  "priority": null,
  "description": null,
  "serviceDate": Sun Nov 23 21:00:00 BRT 2025,
  "cost": 450.75,
  "createdAt": null,
} satisfies ServiceOrders

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ServiceOrders
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


