# ServiceOrdersApi

All URIs are relative to *http://localhost:8080/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteServiceOrder**](ServiceOrdersApi.md#deleteserviceorder) | **DELETE** /serviceOrders/{id} | Remove uma Ordem de Serviço. |
| [**getServiceOrderById**](ServiceOrdersApi.md#getserviceorderbyid) | **GET** /serviceOrders/{id} | Recupera os detalhes de uma Ordem de Serviço específica. |
| [**replaceServiceOrder**](ServiceOrdersApi.md#replaceserviceorder) | **PUT** /serviceOrders/{id} | Substitui completamente um registo de Ordem de Serviço. |
| [**updateServiceOrder**](ServiceOrdersApi.md#updateserviceorder) | **PATCH** /serviceOrders/{id} | Atualiza parcialmente os detalhes de uma Ordem de Serviço. |



## deleteServiceOrder

> deleteServiceOrder(id)

Remove uma Ordem de Serviço.

Remove permanentemente uma Ordem de Serviço pelo seu ID.

### Example

```ts
import {
  Configuration,
  ServiceOrdersApi,
} from '';
import type { DeleteServiceOrderRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServiceOrdersApi(config);

  const body = {
    // string | Identificador único do recurso a ser operado (e.g., /recursos/{id}).
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteServiceOrderRequest;

  try {
    const data = await api.deleteServiceOrder(body);
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
| **id** | `string` | Identificador único do recurso a ser operado (e.g., /recursos/{id}). | [Defaults to `undefined`] |

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
| **204** | Ordem de Serviço removida com sucesso (Sem conteúdo). |  -  |
| **401** | Não autorizado. |  -  |
| **404** | Ordem de Serviço não encontrada. |  -  |
| **500** | Erro interno do servidor. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getServiceOrderById

> ServiceOrders getServiceOrderById(id)

Recupera os detalhes de uma Ordem de Serviço específica.

Retorna a representação completa de uma Ordem de Serviço pelo seu ID único.

### Example

```ts
import {
  Configuration,
  ServiceOrdersApi,
} from '';
import type { GetServiceOrderByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServiceOrdersApi(config);

  const body = {
    // string | Identificador único do recurso a ser operado (e.g., /recursos/{id}).
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetServiceOrderByIdRequest;

  try {
    const data = await api.getServiceOrderById(body);
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
| **id** | `string` | Identificador único do recurso a ser operado (e.g., /recursos/{id}). | [Defaults to `undefined`] |

### Return type

[**ServiceOrders**](ServiceOrders.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Detalhes da Ordem de Serviço recuperada. |  -  |
| **401** | Não autorizado. |  -  |
| **404** | Ordem de Serviço não encontrada pelo ID fornecido. |  -  |
| **500** | Erro interno do servidor. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## replaceServiceOrder

> ServiceOrders replaceServiceOrder(id, createServiceOrdersRequest)

Substitui completamente um registo de Ordem de Serviço.

Substitui o registo completo. Requer todos os campos obrigatórios.

### Example

```ts
import {
  Configuration,
  ServiceOrdersApi,
} from '';
import type { ReplaceServiceOrderRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServiceOrdersApi(config);

  const body = {
    // string | Identificador único do recurso a ser operado (e.g., /recursos/{id}).
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // CreateServiceOrdersRequest | O objeto CreateServiceOrdersRequest completo para substituir o recurso.
    createServiceOrdersRequest: ...,
  } satisfies ReplaceServiceOrderRequest;

  try {
    const data = await api.replaceServiceOrder(body);
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
| **id** | `string` | Identificador único do recurso a ser operado (e.g., /recursos/{id}). | [Defaults to `undefined`] |
| **createServiceOrdersRequest** | [CreateServiceOrdersRequest](CreateServiceOrdersRequest.md) | O objeto CreateServiceOrdersRequest completo para substituir o recurso. | |

### Return type

[**ServiceOrders**](ServiceOrders.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Ordem de Serviço substituída com sucesso. |  -  |
| **400** | Requisição inválida. Erro de validação de dados. |  -  |
| **404** | Ordem de Serviço não encontrada. |  -  |
| **500** | Erro interno do servidor. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateServiceOrder

> ServiceOrders updateServiceOrder(id, createServiceOrdersRequest)

Atualiza parcialmente os detalhes de uma Ordem de Serviço.

Permite atualizar um ou mais campos (Partial Update).

### Example

```ts
import {
  Configuration,
  ServiceOrdersApi,
} from '';
import type { UpdateServiceOrderRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServiceOrdersApi(config);

  const body = {
    // string | Identificador único do recurso a ser operado (e.g., /recursos/{id}).
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // CreateServiceOrdersRequest | O objeto ServiceOrdersRequest com os campos a serem modificados.
    createServiceOrdersRequest: ...,
  } satisfies UpdateServiceOrderRequest;

  try {
    const data = await api.updateServiceOrder(body);
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
| **id** | `string` | Identificador único do recurso a ser operado (e.g., /recursos/{id}). | [Defaults to `undefined`] |
| **createServiceOrdersRequest** | [CreateServiceOrdersRequest](CreateServiceOrdersRequest.md) | O objeto ServiceOrdersRequest com os campos a serem modificados. | |

### Return type

[**ServiceOrders**](ServiceOrders.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Ordem de Serviço atualizada com sucesso. Retorna o objeto atualizado. |  -  |
| **400** | Requisição inválida. Erro de validação de dados. |  -  |
| **404** | Ordem de Serviço não encontrada. |  -  |
| **500** | Erro interno do servidor. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

