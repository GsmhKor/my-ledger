import assert from 'node:assert/strict'
import { afterEach, beforeEach, test } from 'node:test'
import { activateAppUpdate, checkForAppUpdate } from '../src/services/appUpdate.ts'

class Worker extends EventTarget {
  constructor(state) { super(); this.state = state; this.messages = [] }
  change(state) { this.state = state; this.dispatchEvent(new Event('statechange')) }
  postMessage(message) { this.messages.push(message) }
}

class Registration extends EventTarget {
  active = new Worker('activated')
  installing = null
  waiting = null
  calls = 0
  async update() { this.calls += 1 }
}

const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator')
beforeEach(() => {
  globalThis.window = globalThis
  globalThis.document = new EventTarget()
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { serviceWorker: new EventTarget() } })
})
afterEach(() => {
  delete globalThis.window
  delete globalThis.document
  Object.defineProperty(globalThis, 'navigator', originalNavigator)
})

test('missing registration reports a retryable error', async () => {
  await assert.rejects(checkForAppUpdate(undefined), /尚未就绪/)
})

test('an already downloaded update is usable without a network check', async () => {
  const registration = new Registration()
  registration.waiting = new Worker('installed')
  assert.equal(await checkForAppUpdate(registration), true)
  assert.equal(registration.calls, 0)
})

test('unchanged worker reports the current version', async () => {
  assert.equal(await checkForAppUpdate(new Registration()), false)
})

test('check waits for download after update() resolves', async () => {
  const registration = new Registration()
  const worker = new Worker('installing')
  registration.update = async () => {
    registration.installing = worker
    registration.dispatchEvent(new Event('updatefound'))
  }
  let settled = false
  const result = checkForAppUpdate(registration).then(value => { settled = true; return value })
  await Promise.resolve()
  await Promise.resolve()
  assert.equal(settled, false)
  registration.waiting = worker
  worker.change('installed')
  assert.equal(await result, true)
})

test('network and download failures do not report latest version', async () => {
  const offline = new Registration()
  offline.update = async () => { throw new Error('offline') }
  await assert.rejects(checkForAppUpdate(offline), /网络/)
  const registration = new Registration()
  const worker = registration.installing = new Worker('installing')
  const result = checkForAppUpdate(registration)
  worker.change('redundant')
  await assert.rejects(result, /下载失败/)
})

test('check times out if download stalls', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] })
  const registration = new Registration()
  registration.installing = new Worker('installing')
  const result = checkForAppUpdate(registration)
  t.mock.timers.tick(30000)
  await assert.rejects(result, /超时/)
})

test('activation requests skip waiting once and waits until activated', async () => {
  const registration = new Registration()
  const worker = registration.waiting = new Worker('installed')
  let settled = false
  const result = activateAppUpdate(registration).then(() => { settled = true })
  assert.deepEqual(worker.messages, [{ type: 'SKIP_WAITING' }])
  worker.change('activating')
  await Promise.resolve()
  assert.equal(settled, false)
  navigator.serviceWorker.dispatchEvent(new Event('controllerchange'))
  assert.equal(worker.messages.length, 1)
  worker.change('activated')
  await result
})

test('activation handles a worker already activated in another window', async () => {
  await activateAppUpdate(new Registration())
})

test('activation waits for an installing worker before sending its message', async () => {
  const registration = new Registration()
  const worker = registration.installing = new Worker('installing')
  const result = activateAppUpdate(registration)
  assert.equal(worker.messages.length, 0)
  worker.change('installed')
  assert.equal(worker.messages.length, 1)
  worker.change('activated')
  await result
})

test('activation failures and timeouts allow retry', async (t) => {
  const registration = new Registration()
  const worker = registration.waiting = new Worker('installed')
  const failed = activateAppUpdate(registration)
  worker.change('redundant')
  await assert.rejects(failed, /替换/)
  t.mock.timers.enable({ apis: ['setTimeout'] })
  registration.waiting = new Worker('installed')
  const stalled = activateAppUpdate(registration)
  t.mock.timers.tick(15000)
  await assert.rejects(stalled, /超时/)
})
