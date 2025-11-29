# ReportReasonApi

All URIs are relative to *http://localhost:8080/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createDriverReport**](ReportReasonApi.md#createdriverreportoperation) | **POST** /reportReason/driver | Cria um novo relato detalhado de problema por um motorista. |



## createDriverReport

> createDriverReport(createDriverReportRequest)

Cria um novo relato detalhado de problema por um motorista.

Recebe os dados granulares de um motorista sobre um problema no veículo. O *backend* processará esta informação (triagem) e decidirá se uma Ordem de Serviço será criada com base nos requisitos atendidos. 

### Example

```ts
import {
  Configuration,
  ReportReasonApi,
} from '';
import type { CreateDriverReportOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReportReasonApi(config);

  const body = {
    // CreateDriverReportRequest | Dados do relatório de problema fornecidos pelo motorista.
    createDriverReportRequest: ...,
  } satisfies CreateDriverReportOperationRequest;

  try {
    const data = await api.createDriverReport(body);
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
| **createDriverReportRequest** | [CreateDriverReportRequest](CreateDriverReportRequest.md) | Dados do relatório de problema fornecidos pelo motorista. | |

### Return type

`void` (Empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | O relato foi recebido e aceito para processamento (triagem). O *backend* iniciará a análise para determinar se uma Ordem de Serviço será gerada.  |  -  |
| **400** | Requisição inválida. Erro de validação de dados (e.g., campo obrigatório ausente). |  -  |
| **401** | Não autorizado. Token de autenticação ausente ou inválido. |  -  |
| **403** | Proibido. O usuário está autenticado, mas não tem permissão para submeter o relatório. |  -  |
| **404** | Recurso não encontrado. (Ex: O vehicleId ou driverId referenciado não existe). |  -  |
| **500** | Erro interno do servidor. (Inclui falhas inesperadas de infraestrutura/DB). |  -  |
| **0** | Erro inesperado não mapeado. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

