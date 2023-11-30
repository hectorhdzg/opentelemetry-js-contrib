/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  InstrumentationBase,
  InstrumentationConfig,
  InstrumentationNodeModuleDefinition,
} from '@opentelemetry/instrumentation';

import { VERSION } from './version';
import { ConsoleType } from './internal-types';



const consoleMethods = ["log", "info", "warn", "error", "dir", "time", "timeEnd", "trace", "assert"];

export class ConsoleInstrumentation extends InstrumentationBase {
  constructor(config: InstrumentationConfig = {}) {
    super('@opentelemetry/instrumentation-console', VERSION, config);
  }

  init():
    InstrumentationNodeModuleDefinition<ConsoleType> {
    return new InstrumentationNodeModuleDefinition<ConsoleType>(
      "console",
      ['*'],
      moduleExports => {
        this._diag.debug('Applying patch for console');

        for (const method of consoleMethods) {
          this._wrap(
            moduleExports,
            method as keyof ConsoleType,
            <any>this._getPatchedMethod.bind(this)
          );
        }

        return moduleExports;
      },
      moduleExports => {
        if (moduleExports === undefined) return;
        this._diag.debug('Removing patch for console');

        for (const method of consoleMethods) {
          this._unwrap(
            moduleExports,
            method as keyof ConsoleType
          );

        }
      }
    );
  }


  private _getPatchedMethod() {
    return (original: any) => {
      return function patchedWrite(
        this: never,
        ...args: Parameters<typeof original>
      ) {


        return original.apply(this, args);
      };
    };
  }
}
