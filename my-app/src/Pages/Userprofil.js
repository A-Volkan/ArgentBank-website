import React from 'react';
import './Userprofil.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import WelcomeBack from '../Components/welcomeBack';
import Account from '../Components/Account';




const Userprofil = () => {
    return (
        <div>
            <Navbar />
            <main className="main bg-dark">
                <WelcomeBack />
                <Account
                    title="Argent Bank"
                    accountCat="Checking"
                    accountNumber="x8349"
                    amount="$2,082.79"
                    description="Available Balance"
                />
                <Account
                    title="Argent Bank"
                    accountCat="Savings"
                    accountNumber="x6712"
                    amount="$10,928.42"
                    description="Available Balance"
                />
                <Account
                    title="Argent Bank"
                    accountCat="Credit Card"
                    accountNumber="x8349"
                    amount="$184.30"
                    description="Current Balance"
                />
            </main>
            <Footer />
        </div>
    )
}

export default Userprofil;