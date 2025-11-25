
# CreateServiceOrdersRequest

Dados necessários para criar uma nova ordem de serviço.

## Properties

Name | Type
------------ | -------------
`vehicleId` | string
`userId` | string
`description` | string
`type` | [Type](Type.md)
`category` | [Category](Category.md)
`maintenanceNature` | [MaintenanceNature](MaintenanceNature.md)
`impact` | [Impact](Impact.md)
`priority` | [Priority](Priority.md)
`serviceDate` | Date
`status` | [Status](Status.md)

## Example

```typescript
import type { CreateServiceOrdersRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "vehicleId": a1b2c3d4-e5f6-7890-1234-567890abcdef,
  "userId": f0e9d8c7-b6a5-4321-fedc-ba9876543210,
  "description": null,
  "type": null,
  "category": null,
  "maintenanceNature": null,
  "impact": null,
  "priority": null,
  "serviceDate": Sun Nov 23 21:00:00 BRT 2025,
  "status": null,
} satisfies CreateServiceOrdersRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateServiceOrdersRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


