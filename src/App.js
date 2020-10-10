import React from 'react'
import Router from './Router'
import './assets/style.css'
import './assets/reset.css'
import {Header} from './components/Header/index'
import Footer from './components/Footer/Footer'

const App = () => {
    return (
        <>
            <Header />
            <main>
              <Router />
            </main>
            <Footer />
        </>
    )
}

export default App
