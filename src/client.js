import pify from 'pify'
import gradient from '@sanity/gradient-client'

class SanityClient {
  constructor(config = {}) {
    const client = this.client = gradient(config)

    this.gradient = pify({
      fetch: client.fetch.bind(client),
      update: client.update.bind(client),
      create: client.create.bind(client),
      delete: client.delete.bind(client)
    })
  }

  config(newConfig) {
    return typeof newConfig === 'undefined'
      ? this.client.getConfig()
      : this.client.setConfig(newConfig) && this
  }

  fetch(query, params) {
    return this.gradient.fetch(query, params)
  }

  update(documentId, patch, opts) {
    return this.gradient.update(documentId, patch, opts)
  }

  create(doc, opts) {
    return this.gradient.create(doc, opts)
  }

  delete(documentId, opts) {
    return this.gradient.delete(documentId, opts)
  }
}

function createClient(config) {
  return new SanityClient(config)
}

export default createClient