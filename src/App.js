import React from 'react';
import {Provider} from 'react-redux';
import DocumentTitle from 'react-document-title';

import 'bootstrap/dist/css/bootstrap.min.css';
import Page from './views/layout/page';
import store from './store';

function App() {
    return (
        <Provider store={store}>
            <DocumentTitle title="Example title">
                <Page/>
            </DocumentTitle>
        </Provider>
    );
}

export default App;
