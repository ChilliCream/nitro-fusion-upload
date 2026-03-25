# Nitro Fusion Upload

A GitHub Action that uploads GraphQL source schemas to the Nitro registry.

## Usage

```yaml
- uses: ChilliCream/nitro-fusion-upload@v16
  with:
    tag: <tag>
    api-id: <api-id>
    api-key: <api-key>
    source-schema-files:
      - ./src/SchemaA/schema.graphqls
      - ./src/SchemaB/schema.graphqls
    # Optional
    cloud-url: <cloud-url>
```

## Inputs

| Name                  | Required | Description                                      |
| --------------------- | -------- | ------------------------------------------------ |
| `tag`                 | Yes      | The version of the source schemas being uploaded |
| `api-id`              | Yes      | The ID of the API                                |
| `api-key`             | Yes      | API key for authentication                       |
| `source-schema-files` | Yes      | Paths to source schema files                     |
| `cloud-url`           | No       | The URL of the Nitro registry                    |

If you self-host Nitro or use a dedicated hosted instance, you can specify the `cloud-url` input to point to your instance.
