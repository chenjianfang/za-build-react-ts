import React from 'react';
import ReactDOM from 'react-dom';

import style from './index.css';

const Toast = ({ content }) => (
    <div className={style.toastBox}>{content}</div>
);

export default function toast(content, duration = 1500) {
    const div = document.createElement('div');
    ReactDOM.render(React.createElement(Toast, { content }), div);
    document.body.append(div);
    if (duration !== 0) {
        setTimeout(() => {
            div.parentNode.removeChild(div);
        }, duration);
    }
}
