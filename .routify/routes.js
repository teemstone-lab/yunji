
/**
 * @roxi/routify 2.18.8
 * File generated Tue Feb 14 2023 16:30:44 GMT+0900 (대한민국 표준시)
 */

export const __version = "2.18.8"
export const __timestamp = "2023-02-14T07:30:44.845Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "name": "root",
  "filepath": "/",
  "root": true,
  "ownMeta": {},
  "absolutePath": "src/pages",
  "children": [
    {
      "isFile": true,
      "isDir": false,
      "file": "index.svelte",
      "filepath": "/index.svelte",
      "name": "index",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/teem0213/Documents/GitHub/svelte-test-ver2/src/pages/index.svelte",
      "importPath": "../src/pages/index.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": true,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "markup",
      "filepath": "/markup",
      "name": "markup",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Users/teem0213/Documents/GitHub/svelte-test-ver2/src/pages/markup",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "html1.svelte",
          "filepath": "/markup/html1.svelte",
          "name": "html1",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/teem0213/Documents/GitHub/svelte-test-ver2/src/pages/markup/html1.svelte",
          "importPath": "../src/pages/markup/html1.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/markup/html1",
          "id": "_markup_html1",
          "component": () => import('../src/pages/markup/html1.svelte').then(m => m.default)
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "html2.svelte",
          "filepath": "/markup/html2.svelte",
          "name": "html2",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/teem0213/Documents/GitHub/svelte-test-ver2/src/pages/markup/html2.svelte",
          "importPath": "../src/pages/markup/html2.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/markup/html2",
          "id": "_markup_html2",
          "component": () => import('../src/pages/markup/html2.svelte').then(m => m.default)
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "html3.svelte",
          "filepath": "/markup/html3.svelte",
          "name": "html3",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/teem0213/Documents/GitHub/svelte-test-ver2/src/pages/markup/html3.svelte",
          "importPath": "../src/pages/markup/html3.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/markup/html3",
          "id": "_markup_html3",
          "component": () => import('../src/pages/markup/html3.svelte').then(m => m.default)
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/markup"
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "test",
      "filepath": "/test",
      "name": "test",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Users/teem0213/Documents/GitHub/svelte-test-ver2/src/pages/test",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "[slug].svelte",
          "filepath": "/test/[slug].svelte",
          "name": "[slug]",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/teem0213/Documents/GitHub/svelte-test-ver2/src/pages/test/[slug].svelte",
          "importPath": "../src/pages/test/[slug].svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/test/:slug",
          "id": "_test__slug",
          "component": () => import('../src/pages/test/[slug].svelte').then(m => m.default)
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/test"
    }
  ],
  "isLayout": false,
  "isReset": false,
  "isIndex": false,
  "isFallback": false,
  "meta": {
    "recursive": true,
    "preload": false,
    "prerender": true
  },
  "path": "/"
}


export const {tree, routes} = buildClientTree(_tree)

