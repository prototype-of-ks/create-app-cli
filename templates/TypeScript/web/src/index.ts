import { calculate } from './utils';
import './index.css';

const root = document.getElementById('root');
const fragment = document.createDocumentFragment();

const p = document.createElement('p');
p.innerHTML = calculate(1, 2).toString();

fragment.appendChild(p);

root?.appendChild(fragment);

