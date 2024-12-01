import React from 'react'
import Container from '../components/Container'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Home() {
    return (
        <div class="flex flex-col min-h-screen">
            <Header />
            <Container />
            <Footer />
        </div>

    )
}

export default Home