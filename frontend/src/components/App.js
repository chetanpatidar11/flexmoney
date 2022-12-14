import React from "react";
import HomeFormPage from "./YogaForm"

function App() {

    return (
        <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }} className="App">
            <HomeFormPage />
        </div>
    );
}

export default App;
