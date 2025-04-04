/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ClientsImport } from './routes/clients'
import { Route as IndexImport } from './routes/index'
import { Route as SignInIndexImport } from './routes/sign-in/index'
import { Route as EstimateCalculatorIndexImport } from './routes/estimate-calculator/index'
import { Route as ClientsIndexImport } from './routes/clients/index'
import { Route as ClientsCreateImport } from './routes/clients/create'
import { Route as ClientsIdImport } from './routes/clients/$id'

// Create/Update Routes

const ClientsRoute = ClientsImport.update({
  id: '/clients',
  path: '/clients',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SignInIndexRoute = SignInIndexImport.update({
  id: '/sign-in/',
  path: '/sign-in/',
  getParentRoute: () => rootRoute,
} as any)

const EstimateCalculatorIndexRoute = EstimateCalculatorIndexImport.update({
  id: '/estimate-calculator/',
  path: '/estimate-calculator/',
  getParentRoute: () => rootRoute,
} as any)

const ClientsIndexRoute = ClientsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => ClientsRoute,
} as any)

const ClientsCreateRoute = ClientsCreateImport.update({
  id: '/create',
  path: '/create',
  getParentRoute: () => ClientsRoute,
} as any)

const ClientsIdRoute = ClientsIdImport.update({
  id: '/$id',
  path: '/$id',
  getParentRoute: () => ClientsRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/clients': {
      id: '/clients'
      path: '/clients'
      fullPath: '/clients'
      preLoaderRoute: typeof ClientsImport
      parentRoute: typeof rootRoute
    }
    '/clients/$id': {
      id: '/clients/$id'
      path: '/$id'
      fullPath: '/clients/$id'
      preLoaderRoute: typeof ClientsIdImport
      parentRoute: typeof ClientsImport
    }
    '/clients/create': {
      id: '/clients/create'
      path: '/create'
      fullPath: '/clients/create'
      preLoaderRoute: typeof ClientsCreateImport
      parentRoute: typeof ClientsImport
    }
    '/clients/': {
      id: '/clients/'
      path: '/'
      fullPath: '/clients/'
      preLoaderRoute: typeof ClientsIndexImport
      parentRoute: typeof ClientsImport
    }
    '/estimate-calculator/': {
      id: '/estimate-calculator/'
      path: '/estimate-calculator'
      fullPath: '/estimate-calculator'
      preLoaderRoute: typeof EstimateCalculatorIndexImport
      parentRoute: typeof rootRoute
    }
    '/sign-in/': {
      id: '/sign-in/'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface ClientsRouteChildren {
  ClientsIdRoute: typeof ClientsIdRoute
  ClientsCreateRoute: typeof ClientsCreateRoute
  ClientsIndexRoute: typeof ClientsIndexRoute
}

const ClientsRouteChildren: ClientsRouteChildren = {
  ClientsIdRoute: ClientsIdRoute,
  ClientsCreateRoute: ClientsCreateRoute,
  ClientsIndexRoute: ClientsIndexRoute,
}

const ClientsRouteWithChildren =
  ClientsRoute._addFileChildren(ClientsRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/clients': typeof ClientsRouteWithChildren
  '/clients/$id': typeof ClientsIdRoute
  '/clients/create': typeof ClientsCreateRoute
  '/clients/': typeof ClientsIndexRoute
  '/estimate-calculator': typeof EstimateCalculatorIndexRoute
  '/sign-in': typeof SignInIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/clients/$id': typeof ClientsIdRoute
  '/clients/create': typeof ClientsCreateRoute
  '/clients': typeof ClientsIndexRoute
  '/estimate-calculator': typeof EstimateCalculatorIndexRoute
  '/sign-in': typeof SignInIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/clients': typeof ClientsRouteWithChildren
  '/clients/$id': typeof ClientsIdRoute
  '/clients/create': typeof ClientsCreateRoute
  '/clients/': typeof ClientsIndexRoute
  '/estimate-calculator/': typeof EstimateCalculatorIndexRoute
  '/sign-in/': typeof SignInIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/clients'
    | '/clients/$id'
    | '/clients/create'
    | '/clients/'
    | '/estimate-calculator'
    | '/sign-in'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/clients/$id'
    | '/clients/create'
    | '/clients'
    | '/estimate-calculator'
    | '/sign-in'
  id:
    | '__root__'
    | '/'
    | '/clients'
    | '/clients/$id'
    | '/clients/create'
    | '/clients/'
    | '/estimate-calculator/'
    | '/sign-in/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ClientsRoute: typeof ClientsRouteWithChildren
  EstimateCalculatorIndexRoute: typeof EstimateCalculatorIndexRoute
  SignInIndexRoute: typeof SignInIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ClientsRoute: ClientsRouteWithChildren,
  EstimateCalculatorIndexRoute: EstimateCalculatorIndexRoute,
  SignInIndexRoute: SignInIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/clients",
        "/estimate-calculator/",
        "/sign-in/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/clients": {
      "filePath": "clients.tsx",
      "children": [
        "/clients/$id",
        "/clients/create",
        "/clients/"
      ]
    },
    "/clients/$id": {
      "filePath": "clients/$id.tsx",
      "parent": "/clients"
    },
    "/clients/create": {
      "filePath": "clients/create.tsx",
      "parent": "/clients"
    },
    "/clients/": {
      "filePath": "clients/index.tsx",
      "parent": "/clients"
    },
    "/estimate-calculator/": {
      "filePath": "estimate-calculator/index.tsx"
    },
    "/sign-in/": {
      "filePath": "sign-in/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
