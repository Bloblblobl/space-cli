import {Command} from '@oclif/core'
import {get} from 'node:http'

export default class SpaceCLI extends Command {
  static description = 'Get the number of humans currently in space.'

  static examples = [
    '$ space-cli\nNumber of humans currently in space: 10',
  ]

  async run(): Promise<void> {
    get('http://api.open-notify.org/astros.json', res => {
      res.on('data', d => {
        const details = JSON.parse(d)
        this.log(`Number of humans currently in space: ${details.number}`)
      })
    }).on('error', e => {
      this.error(e)
    })
  }
}
