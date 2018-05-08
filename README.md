[![npm][npm]][npm-url]

# image-webp-laoder

Your can with webpack-loader to convert ordinary picture format to webp pictures, you can produce **original pictures and webp pictures** together and keep the **same hash**

## Install

```sh
npm install image-webp-laoder --save-dev
```

## Usage

Here is the example of using `image-webp-laoder`, after packaging will produce the original picture and webp picture to the specified path:

```javascript
rules: [
  {
    test: /\.(png|jpe?g)$/i,
    use: [
      {
        loader: 'image-webp-loader',
        options: {
          publicPath: '/',
          outputPath: resolve(__dirname, './dist'),
          name: 'images/[name].[hash].[ext]'
        }
      }
    ]
  }
]
```

If you want to control the size of the webp image, you can add the `quality` attribute, set quality factor between 0 and 100 ( `Default: 100` )

```javascript
rules: [
  {
    test: /\.(png|jpe?g)$/i,
    use: [
      {
        loader: 'image-webp-loader',
        options: {
          publicPath: '/',
          outputPath: resolve(__dirname, './dist'),
          name: 'images/[name].[hash].[ext]',
          quality: 85
        }
      }
    ]
  }
]
```
**Tip:** For some original images that have been optimized by compression, `image-webp-loader` will **fail to convert**. We will give details on the console. At this time, you can reduce the `quality` attributes or add `subQuality` attributes to set separate quality for these files.

```javascript
rules: [
  {
    test: /\.(png|jpe?g)$/i,
    use: [
      {
        loader: 'image-webp-loader',
        options: {
          publicPath: '/',
          outputPath: resolve(__dirname, './dist'),
          name: 'images/[name].[hash].[ext]',
          quality: 100,
          subQuality: {
            '1.jpg': 80,
            '2.jpg': 70
          }
        }
      }
    ]
  }
]
```
This will cause `1.jpg` and `2.jpg` to use `80` and `70` quality to produce webp pictures, thus solving the case of failed packaging but at the same time it also brings about some blurring

## Compatible

In actual development, webp needs to be compatible. In the case of browser support, the webp format is used. Since the decision logic cannot be embedded in `webpack`, we rely on the server to determine whether webp is supported. The `requestType` is defined in `image-webp-laoder`. The attribute, requestType attribute, can change the picture request suffix and conditionally respond to requests for special suffixes. For example:

```javascript
rules: [
  {
    test: /\.(png|jpe?g)$/i,
    use: [
      {
        loader: 'image-webp-loader',
        options: {
          publicPath: '/',
          outputPath: resolve(__dirname, './dist'),
          name: 'images/[name].[hash].[ext]',
          requestType: 'image'
        }
      }
    ]
  }
]
```
If we generate `1.jpg` and `1.webp` files by default the browser will request the picture via `1.jpg`, if we change the requestType attribute to `'image'` then the request becomes `1.image` if not considered compatible You can set the `requestType: 'webp'`, then all picture requests become webp requests.

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`name`**|`String`|`[name].[hash].[ext]`|Configure a custom filename template for your file|
|**`publicPath`**|`String`|`'/'`|Configure a custom `public` path for your file|
|**`outputPath`**|`String`|`resolve(__dirname, '../../dist')`|Configure a custom `output` path for your file (`distPath`)|
|**`quality`**|`Int`|`100`|Set webp picture compression quality, (`0~100`)|
|**`subQuality`**|`JSON-Object`|`{}`|Set the compression quality of special pictures|
|**`requestType`**|`String`|`false`|Set picture request suffix|

## Inspiration

`image-webp-laoder` is heavily inspired by [webp-loader](https://www.npmjs.com/package/webp-loader).

## License

[MIT](http://opensource.org/licenses/MIT)

[npm]: https://img.shields.io/npm/v/image-webp-loader.svg
[npm-url]: https://npmjs.com/package/file-loader