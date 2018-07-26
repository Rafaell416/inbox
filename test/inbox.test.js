const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const provider = ganache.provider()
const web3 = new Web3(provider)
const { interface, bytecode } = require('../compile')
const ora = require('ora')

let accounts
let inbox

beforeEach( async () => {
  const fetchedAccounts = await web3.eth.getAccounts()
  accounts = fetchedAccounts

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hello cosmos'] })
    .send({ from: accounts[0], gas: '1000000' })

   inbox.setProvider(provider)
})


describe('Inbox', () => {
  it('Deploys a contract', () => {
    assert.ok(inbox.options.address)
  })

  it('Has a default message', async () => {
    const message = await inbox.methods.message().call()
    assert.equal(message, 'Hello cosmos')
  })

  it('Updates message', async () => {
    await inbox.methods.setMessage('Updated message dude').send({ from: accounts[0] })
    const message = await inbox.methods.message().call()
    assert.equal(message, 'Updated message dude')
  })
})
