const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const chalk = require('chalk') //color outputs
const log = console.log

const provider = new HDWalletProvider(
  'zoo dizzy pass like grape silly summer best glimpse ketchup wage nation',
  'https://rinkeby.infura.io/v3/2ac0eda37fdc4c808f1c164ded3ff14c'
)

const web3 = new Web3(provider)

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts()
    log(chalk.blue('Attempting to deploy from account', accounts[0]))

    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: '0x' + bytecode, arguments: ['Hello cosmos'] })
      .send({ gas: '1000000', from: accounts[0] })

    log(chalk.green('Contract deployed to', result.options.address))
  } catch (e) {
    log(chalk.red('There was an error deploying the contract ==>', e))
    process.exit(1)
  }
}

deploy()
