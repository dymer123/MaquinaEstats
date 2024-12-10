import { setup } from 'xstate';

export const feedbackMachine = setup({
  types: {
    context: {} as {},
    events: {} as
      | { type: 'obtenirCodi' }
      | { type: 'testOk' }
      | { type: 'build' }
      | { type: 'deployPre' }
      | { type: 'userTestPre' }
      | { type: 'deployPro' }
      | { type: 'parada' },
  },
}).createMachine({
  id: 'deployPipeline',
  initial: 'parada',
  states: {
    parada: {
      on: {
        obtenirCodi: 'codiObtingut',
      },
    },
    codiObtingut: {
      on: {
        testOk: 'testComplet',
      },
    },
    testComplet: {
      on: {
        build: 'buildFinalitzat',
      },
    },
    buildFinalitzat: {
      on: {
        deployPre: 'preDeploy',
      },
    },
    preDeploy: {
      on: {
        userTestPre: 'preTestComplet',
      },
    },
    preTestComplet: {
      on: {
        deployPro: 'deployFinalitzat',
      },
    },
    deployFinalitzat: {
      on: {
        parada: 'parada',
      },
    },
  },
});
