The `header` portion supports `label`, `transforms` and `format` fields.

## **`header.label = <string>`**

`label` is the most essential as it describes the value displayer to the user. This should be a string. For example search options are populated based on this.

**Example:**

```code
lang: js
---
{
  header: {
    label: 'Name'
  }
}
```

Given you might want to attach custom functionality to a header, say sorting on click, it is possible to attach specific *transforms* to the header cell. The same idea works for table cells.

## **`header.transforms`**

```code
lang: js
---
header.transforms = [
  (<label>, {
    columnIndex: <number>,
    column: <object>
  }
) => ({... props ...})]
```

A transform is expected to return an object containing props. We can for instance inject `onClick` handler and perform sorting based on that. If a transform returns `children`, it will override rendering behavior making it possible to implement editors.

The idea of transforms is that they can inject `propTypes` to the current cell (same idea for header and content). In this case we inject `onClick` handler so that sorting works. If a transform returns `children`, it will override rendering behavior. This is useful for transforms like `edit`.

**Example:**

```code
lang: js
---
{
  header: {
    label: 'Name',
    transforms: [sortable]
  }
}
```

To give you a concrete example of overriding, consider the example below:

```code
lang: js
---
{
  header: {
    label: 'Name',
    transforms: [
      () => ({
        children: <span>override to show instead of value</span>
      })
    ]
  }
}
```

## **`header.format = label => <string|React element>`**

If manipulating `propTypes` isn't enough, you can `format` the output. This should return something React can display. The result will be displayed **within** a table cell.

In the following example we use it to inject an extra checkbox to the header cell.

**Example:**

```code
lang: js
---
{
  header: {
    label: 'Name',
    format: name => (
      <div>
        <input
          type="checkbox"
          onClick={() => console.log('clicked')}
          style={{ width: '20px' }}
        />
        <span>{name}</span>
      </div>
    )
  }
}
```

## **`header.props = <object>`**

You can set header specific props through `props`.

**Example:**

```code
lang: js
---
{
  header: {
    label: 'Name',
    props: {
      style: {
        width: 100
      }
    }
  }
}
```
