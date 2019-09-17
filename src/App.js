import React, { useState } from 'react';
// import { ApolloProvider } from 'react-apollo';
// import { BrowserRouter as Router } from 'react-router-dom';
// import AuthProvider from './auth-context';
// import AppNavigator from './Applications/AppNavigator';
// import client from './apollo-config';
import { Select } from './components';

// import { CheatSheet } from './components';

export default function App() {
    const [value, setValue] = useState("ONE");
    return (
        // <CheatSheet>
        // <Router>
        //     <ApolloProvider client={client}>
        //         <AuthProvider>
        //             <AppNavigator />
        //         </AuthProvider>
        //     </ApolloProvider>
        // </Router>
        <Select
            value={value}
            options={[
                "TWO",
                "THREE",
                "FOUR",
                "FIVE",
            ]}
            onChange={value => setValue(value)}
        />
        // </CheatSheet>
    );
}