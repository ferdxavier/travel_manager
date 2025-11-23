# VehiclesApi

All URIs are relative to *http://localhost:8080/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createVehicle**](VehiclesApi.md#createvehicleoperation) | **POST** /vehicles | Cria um novo registo de veículo na frota. |
| [**deleteVehicle**](VehiclesApi.md#deletevehicle) | **DELETE** /vehicles/{id} | Remove um veículo da frota. |
| [**getVehicleById**](VehiclesApi.md#getvehiclebyid) | **GET** /vehicles/{id} | Recupera os detalhes de um veículo específico. |
| [**listVehicles**](VehiclesApi.md#listvehicles) | **GET** /vehicles | Lista todos os veículos disponíveis na frota. |
| [**replaceVehicle**](VehiclesApi.md#replacevehicle) | **PUT** /vehicles/{id} | Substitui completamente um registo de veículo. |
| [**updateVehicle**](VehiclesApi.md#updatevehicleoperation) | **PATCH** /vehicles/{id} | Atualiza parcialmente os detalhes de um veículo. |



## createVehicle

> Vehicle createVehicle(createVehicleRequest)

Cria um novo registo de veículo na frota.

Adiciona um novo veículo à frota, validando que a placa de matrícula é única.

### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { CreateVehicleOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // CreateVehicleRequest | O objeto CreateVehicleRequest necessário para criar um novo veículo.
    createVehicleRequest: ...,
  } satisfies CreateVehicleOperationRequest;

  try {
    const data = await api.createVehicle(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **createVehicleRequest** | [CreateVehicleRequest](CreateVehicleRequest.md) | O objeto CreateVehicleRequest necessário para criar um novo veículo. | |

### Return type

[**Vehicle**](Vehicle.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Veículo criado com sucesso. Retorna o objeto Vehicle completo. |  -  |
| **0** | Erro ao criar o veículo. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteVehicle

> deleteVehicle(id)

Remove um veículo da frota.

Remove permanentemente (ou logicamente desativa) um veículo pelo seu ID.

### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { DeleteVehicleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // number | Identificador para indexar.
    id: 56,
  } satisfies DeleteVehicleRequest;

  try {
    const data = await api.deleteVehicle(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `number` | Identificador para indexar. | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Veículo removido com sucesso (Sem conteúdo). |  -  |
| **404** | Veículo não encontrado. |  -  |
| **0** | Erro ao remover o veículo. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getVehicleById

> Vehicle getVehicleById(id)

Recupera os detalhes de um veículo específico.

Retorna a representação completa de um veículo pelo seu ID único.

### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { GetVehicleByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // number | Identificador para indexar.
    id: 56,
  } satisfies GetVehicleByIdRequest;

  try {
    const data = await api.getVehicleById(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `number` | Identificador para indexar. | [Defaults to `undefined`] |

### Return type

[**Vehicle**](Vehicle.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Detalhes do veículo recuperado. |  -  |
| **404** | Veículo não encontrado. |  -  |
| **0** | Erro inesperado. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listVehicles

> Array&lt;Vehicle&gt; listVehicles(status, limit)

Lista todos os veículos disponíveis na frota.

Recupera uma lista paginada de todos os veículos registados na frota, com opções de filtragem por status operacional.

### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { ListVehiclesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // 'available' | 'maintenance' | 'retired' | Filtra por status do veículo (ex: \'available\', \'maintenance\'). (optional)
    status: status_example,
    // number | Número máximo de itens a retornar por página. (optional)
    limit: 56,
  } satisfies ListVehiclesRequest;

  try {
    const data = await api.listVehicles(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **status** | `available`, `maintenance`, `retired` | Filtra por status do veículo (ex: \&#39;available\&#39;, \&#39;maintenance\&#39;). | [Optional] [Defaults to `undefined`] [Enum: available, maintenance, retired] |
| **limit** | `number` | Número máximo de itens a retornar por página. | [Optional] [Defaults to `50`] |

### Return type

[**Array&lt;Vehicle&gt;**](Vehicle.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Uma lista paginada de veículos. |  -  |
| **0** | Erro inesperado. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## replaceVehicle

> Vehicle replaceVehicle(id, createVehicleRequest)

Substitui completamente um registo de veículo.

Substitui o registo completo do veículo pelo ID. Requer todos os campos obrigatórios.

### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { ReplaceVehicleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // number | Identificador para indexar.
    id: 56,
    // CreateVehicleRequest | O objeto VehicleRequest completo para substituir o recurso.
    createVehicleRequest: ...,
  } satisfies ReplaceVehicleRequest;

  try {
    const data = await api.replaceVehicle(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `number` | Identificador para indexar. | [Defaults to `undefined`] |
| **createVehicleRequest** | [CreateVehicleRequest](CreateVehicleRequest.md) | O objeto VehicleRequest completo para substituir o recurso. | |

### Return type

[**Vehicle**](Vehicle.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Veículo substituído com sucesso. |  -  |
| **0** | Erro ao substituir o veículo. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateVehicle

> Vehicle updateVehicle(id, updateVehicleRequest)

Atualiza parcialmente os detalhes de um veículo.

Permite atualizar um ou mais campos do veículo sem enviar o objeto completo (Partial Update).

### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { UpdateVehicleOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // number | Identificador para indexar.
    id: 56,
    // UpdateVehicleRequest | O objeto UpdateVehicleRequest com os campos a serem modificados.
    updateVehicleRequest: ...,
  } satisfies UpdateVehicleOperationRequest;

  try {
    const data = await api.updateVehicle(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `number` | Identificador para indexar. | [Defaults to `undefined`] |
| **updateVehicleRequest** | [UpdateVehicleRequest](UpdateVehicleRequest.md) | O objeto UpdateVehicleRequest com os campos a serem modificados. | |

### Return type

[**Vehicle**](Vehicle.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Veículo atualizado com sucesso. Retorna o objeto atualizado. |  -  |
| **0** | Erro ao atualizar o veículo. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

