
# BaseEntityProperties


## Properties

Name | Type
------------ | -------------
`id` | string
`createdAt` | Date

## Example

```typescript
import type { BaseEntityProperties } from ''

// TODO: Update the object below with actual values
const example = {
  "id": a1b2c3d4-e5f6-7890-1234-567890abcdef,
  "createdAt": 2025-01-25T10:00Z,
} satisfies BaseEntityProperties

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BaseEntityProperties
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


