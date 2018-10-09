# w2020-shared-library

## Initial Setup

Clone this repository into the Development folder and go into "w2020-shared-library"
Install dependencies by running:

```
npm install
```

## Installation 

Generate all `*.js`, `*.d.ts` and `*.metadata.json` files by running this command in w2020-shared-library:

```bash
$ npm run build
```
To install this library in other projects, run this command in that project:

```bash
$ npm install w2020-shared-library --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install w2020-shared-library
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { SampleModule } from 'w2020-shared-library';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<sampleComponent></sampleComponent>
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © WinSupply, Inc.
