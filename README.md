# Micropub Action

This action uses [`grantcodes/micropub`](https://github.com/grantcodes/micropub) to post to your personal website.

## Inputs

### `endpoint`

**Required** The url of your micropub endpoint.

### `token`

**Required** Your indieauth token - I highly recommend using a secret for this.

### `post`

**Required** The post to create.

The action tries to be intelligent and figure out if you are using a form encoded style object, json style object or a json string.

## Outputs

### `url`

The url of the created post.

## Example usage

```yaml
uses: grantcodes/micropub-action@v1
with:
  endpoint: "https://example.com/micropub"
  token: ${{ secrets.MICROPUB_TOKEN }}
  post:
    - content: "Hello this is a basic note"
```

```yaml
uses: grantcodes/micropub-action@v1
with:
  endpoint: "https://example.com/micropub"
  token: ${{ secrets.MICROPUB_TOKEN }}
  post:
    - type:
        - "h-entry"
    - properties:
        - name:
            - "Full Article"
        - content:
            - "This is a full in valid json representation"
        - category: ["foo", "bar"]
```
