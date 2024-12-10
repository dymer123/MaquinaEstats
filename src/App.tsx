import './App.css';
import { feedbackMachine } from './feedbackMachine';
import { useMachine } from '@xstate/react';
import { createBrowserInspector } from '@statelyai/inspect';
import git from './img/git.png'; 
import of from './img/of.png'; 

const { inspect } = createBrowserInspector({
  autoStart: false,
});

function Feedback() {
  const [state, send] = useMachine(feedbackMachine, {
    inspect,
  });

  return (
    <div className="feedback">
      {state.matches('parada') && (
        <div className="step">
          <h2>Parada</h2>
          <img src={of} alt="Parada" width={250} />
          <button
            className="button"
            onClick={() => send({ type: 'obtenirCodi' })}
          >
            Obtenir codi
          </button>
        </div>
      )}

      {state.matches('codiObtingut') && (
        <div className="step">
          <h2>Obtenir el codi</h2>
          <img src={git} alt="Parada" width={250} />
          <button
            className="button"
            onClick={() => send({ type: 'testOk' })}
          >
            Codi obtingut
          </button>
        </div>
      )}

      {state.matches('testComplet') && (
        <div className="step">
          <h2>Test</h2>
          <button
            className="button"
            onClick={() => send({ type: 'build' })}
          >
            OK
          </button>
        </div>
      )}

      {state.matches('buildFinalitzat') && (
        <div className="step">
          <h2>Build</h2>
          <button
            className="button"
            onClick={() => send({ type: 'deployPre' })}
          >
            Finish
          </button>
        </div>
      )}

      {state.matches('preDeploy') && (
        <div className="step">
          <h2>Deploy Pre</h2>
          <button
            className="button"
            onClick={() => send({ type: 'userTestPre' })}
          >
            Servidor
          </button>
        </div>
      )}

      {state.matches('preTestComplet') && (
        <div className="step">
          <h2>User Test Pre</h2>
          <button
            className="button"
            onClick={() => send({ type: 'deployPro' })}
          >
            OK
          </button>
        </div>
      )}

      {state.matches('deployFinalitzat') && (
        <div className="step">
          <h2>Deploy Pro</h2>
          <button
            className="button"
            onClick={() => send({ type: 'parada' })}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  return <Feedback />;
}

export default App;
