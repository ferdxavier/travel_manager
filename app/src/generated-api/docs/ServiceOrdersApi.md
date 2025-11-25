# ServiceOrdersApi

All URIs are relative to *http://localhost:8080/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createServiceOrder**](ServiceOrdersApi.md#createserviceorder) | **POST** /serviceOrders | Cria uma nova ordem de serviço. |
| [**listServiceOrders**](ServiceOrdersApi.md#listserviceorders) | **GET** /serviceOrders | Lista todas as ordens de serviço. |



## createServiceOrder

> ServiceOrders createServiceOrder(createServiceOrdersRequest)

Cria uma nova ordem de serviço.

Adiciona uma nova ordem de serviço para um veículo específico.

### Example

```ts
import {
  Configuration,
  ServiceOrdersApi,
} from '';
import type { CreateServiceOrderRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServiceOrdersApi(config);

  const body = {
    // CreateServiceOrdersRequest | O objeto CreateServiceOrdersRequest necessário para criar a ordem.
    createServiceOrdersRequest: ...,
  } satisfies CreateServiceOrderRequest;

  try {
    const data = await api.createServiceOrder(body);
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
| **createServiceOrdersRequest** | [CreateServiceOrdersRequest](CreateServiceOrdersRequest.md) | O objeto CreateServiceOrdersRequest necessário para criar a ordem. | |

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
| **201** | Ordem de serviço criada com sucesso. Retorna o objeto ServiceOrders completo. |  -  |
| **0** | Modelo de resposta para erros. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listServiceOrders

> Array&lt;ServiceOrders&gt; listServiceOrders(status, vehicleId, limit)

Lista todas as ordens de serviço.

Recupera uma lista paginada de todas as ordens de serviço, com opções de filtragem por status ou veículo.

### Example

```ts
import {
  Configuration,
  ServiceOrdersApi,
} from '';
import type { ListServiceOrdersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServiceOrdersApi(config);

  const body = {
    // Status | Filtra por status da ordem de serviço (ex: \'open\', \'closed\'). (optional)
    status: ...,
    // string | Filtra ordens de serviço associadas a um veículo específico. (optional)
    vehicleId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // number | Número máximo de itens a retornar por página. (optional)
    limit: 56,
  } satisfies ListServiceOrdersRequest;

  try {
    const data = await api.listServiceOrders(body);
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
| **status** | `Status` | Filtra por status da ordem de serviço (ex: \&#39;open\&#39;, \&#39;closed\&#39;). | [Optional] [Defaults to `undefined`] [Enum: open, in_progress, closed, canceled] |
| **vehicleId** | `string` | Filtra ordens de serviço associadas a um veículo específico. | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | Número máximo de itens a retornar por página. | [Optional] [Defaults to `50`] |

### Return type

[**Array&lt;ServiceOrders&gt;**](ServiceOrders.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Uma lista paginada de ordens de serviço. |  -  |
| **0** | Modelo de resposta para erros. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

