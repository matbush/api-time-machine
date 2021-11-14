#! /usr/bin/env node

import cli from 'commander';
import record from './commands/record.js';

cli.name('apitm');
cli.description('Record an API over a time period, then play it back later');
cli.usage('<command>');
cli.addHelpCommand(false);
cli.helpOption(false);

cli.command('record')
    .argument('<url>', 'URL to record')
    .option('-i, --interval, <number>', 'Interval to wait before hitting the api again', 5000)
    .description('Record an API every interval')
    .action(record);

cli.parse(process.argv);
