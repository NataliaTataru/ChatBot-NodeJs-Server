'use strict';

const {DEFAULT_MAX_STEPS} = require('.//config');
const logger = require('.//log.js');
const readline = require('readline');
const uuid = require('uuid');

module.exports = (wit, initContext, maxSteps) => {
  let context = typeof initContext === 'object' ? initContext : {};
  const sessionId = uuid.v1();

  const steps = maxSteps ? maxSteps : DEFAULT_MAX_STEPS;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.setPrompt('> ');
  const prompt = () => {
    rl.prompt();
    rl.write('null', {ctrl: true, name: 'e'});
  };
  prompt();
//  rl.on('line', (line) => {
//    line = line.trim();
//    if (!line) {
//      return prompt();
//    }
//    wit.runActions(sessionId, line, context, steps)
//    .then((ctx) => {
//      context = ctx;
//      prompt();
//    })
//    .catch(err => console.error(err))
//  });
  
  //nou
  this.rl.on('line', ((line) => {
      const msg = line.trim();
      this.runActions(sessionId,msg,this.context,
        (error, context) => {
          if (error) {
            l.error(error);
          } else {
            this.context = context;
          }
          this.rl.prompt();
          this.rl.write('null', {ctrl: true, name: 'e'});
        },
        steps
      );
    }).bind(this));
  
};
