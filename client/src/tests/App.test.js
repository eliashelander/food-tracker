import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from '../App';

describe('App', () => {
  it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('Should match snapshot', () => {
    const app = renderer
      .create(<App />)
      .toJSON();
    expect(app).toMatchSnapshot();
  });
});
