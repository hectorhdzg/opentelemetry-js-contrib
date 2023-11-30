# OpenTelemetry instrumentation for console

[![NPM Published Version][npm-img]][npm-url]
[![Apache License][license-image]][license-image]

This module provides automatic instrumentation for the [`console`](https://nodejs.org/dist/latest/docs/api/console.html) module to send console logs to the OpenTelemetry Logging SDK, which may be loaded using the [`@opentelemetry/sdk-trace-node`](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-sdk-trace-node) package.

Compatible with OpenTelemetry JS API and SDK `1.0+`.

## Installation

```bash
npm install --save @opentelemetry/instrumentation-console
```

## Usage

```js
const { NodeSDK, tracing, logs, api } = require('@opentelemetry/sdk-node');
const { ConsoleInstrumentation } = require('@opentelemetry/instrumentation-console');
const sdk = new NodeSDK({
  spanProcessor: new tracing.SimpleSpanProcessor(new tracing.ConsoleSpanExporter()),
  logRecordProcessor: new logs.SimpleLogRecordProcessor(new logs.ConsoleLogRecordExporter()),
  instrumentations: [
    new ConsoleInstrumentation(),
  ]
});

console.log('hello world');

// Log records will be sent to the SDK-registered log record processor, if any.


### Log sending

Console calls will automatically send log records to the OpenTelemetry Logs SDK. The OpenTelemetry SDK can be configured to handle those records -- for example, sending them on to an OpenTelemetry collector for log archiving and processing. The example above shows a minimal configuration that emits OpenTelemetry log records to the console for debugging.

If the OpenTelemetry SDK is not configured with a Logger provider, then this will be a no-op.


## Useful links

- For more information on OpenTelemetry, visit: <https://opentelemetry.io/>
- For more about OpenTelemetry JavaScript: <https://github.com/open-telemetry/opentelemetry-js>
- For help or feedback on this project, join us in [GitHub Discussions][discussions-url]

## License

Apache 2.0 - See [LICENSE][license-url] for more information.

[discussions-url]: https://github.com/open-telemetry/opentelemetry-js/discussions
[license-url]: https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/LICENSE
[license-image]: https://img.shields.io/badge/license-Apache_2.0-green.svg?style=flat
[npm-url]: https://www.npmjs.com/package/@opentelemetry/instrumentation-console
[npm-img]: https://badge.fury.io/js/%40opentelemetry%2Finstrumentation-console.svg
