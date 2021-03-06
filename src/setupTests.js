import fetchMock from "jest-fetch-mock";
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
fetchMock.enableMocks();