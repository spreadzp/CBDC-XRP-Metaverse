import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useP2p } from '../contexts/p2p';
import Borrow from './Borrow';
import ChatForm from './ChatForm';

// const members = [
//     { name: "Jhon", peerId: "ljkkj", role: "Borrower", rating: 4.25 },
//     { name: "Jhon", peerId: "ljkkj", role: "Borrower", rating: 4.25 },
//     { name: "Jhon", peerId: "ljkkj", role: "Borrower", rating: 4.25 },
//     { name: "Jhon", peerId: "ljkkj", role: "Borrower", rating: 4.25 },
//     { name: "Jhon", peerId: "ljkkj", role: "Borrower", rating: 4.25 },
//     { name: "Jhon", peerId: "ljkkj", role: "Borrower", rating: 4.25 },
//     { name: "Jhon", peerId: "ljkkj", role: "Borrower", rating: 4.25 },
//     { name: "Jhon", peerId: "ljkkj", role: "Borrower", rating: 4.25 }
// ]
function Chat({ rating }) {
    const { state } = useP2p();
    const bankAcc = localStorage.getItem("walletBank") || "";
  const [bankAccount, setBankAccount] = useState(bankAcc.length > 0 ? JSON.parse(bankAcc): null);
    const getValidators = () => {
        const validators = Array(10).fill().map(item => ({ name: "Jhon", peerId: "ljkkj", role: "Borrower", rating: 4.25 }))
        return validators.map(item => {
            item.name = genRandonString(6);
            item.peerId = genRandonString(12);
            item.role = "Validator";
            item.rating = Math.random() * 10;
            return item;
        })
    }

    const getPlayers = () => {
        const players = Array(10).fill().map(item => ({ name: "Jhon", peerId: "ljkkj", role: "Borrower", rating: 4.25 }))
        const t = players.map(item => {
            item.name = genRandonString(6);
            item.peerId = genRandonString(12);
            item.role = "Player";
            item.rating = Math.random() * 10;
            return item;
        })
        return t;
    }
    const getCharities = () => {
        const charities = Array(10).fill().map(item => ({ name: "Jhon", peerId: "ljkkj", role: "Borrower", rating: 4.25 }))
        return charities.map(item => {
            item.name = genRandonString(6);
            item.peerId = genRandonString(12);
            item.role = "Charity";
            item.rating = Math.random() * 10;
            return item;
        })
    }
    const getEarnMembers = () => {
        const earners = Array(10).fill().map(item => ({ name: "Jhon", peerId: "ljkkj", role: "Borrower", rating: 4.25 }))
        return earners.map(item => {
            item.name = genRandonString(6);
            item.peerId = genRandonString(12);
            item.role = "Earners";
            item.rating = Math.random() * 10;
            return item;
        })
    }

    const getBorrowers = () => {
        const borrowers = Array(10).fill().map(item => ({ name: "Jhon", peerId: "ljkkj", role: "Borrower", rating: 4.25 }))
        return borrowers.map(item => {
            item.name = genRandonString(6);
            item.peerId = genRandonString(12);
            item.role = "Borrower";
            item.rating = Math.random() * 10;
            return item;
        })
    }

    const getLenders = () => {
        const res = [];
        state?.connectedPeers?.forEach((item) => {
            const lender = {
                name: genRandonString(6),
                peerId: item,
                role: "Lender",
                rating: (Math.random() * 10).toFixed(2)
            };
            res.push(lender);
        })
        return res;
    }

    function genRandonString(length) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        var charLength = chars.length;
        var result = '';
        for (var i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }
    return (
        <>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Lend" title="Lend">
                    <ChatForm members={getLenders()} />
                </Tab>
                <Tab eventKey="Borrow" title="Borrow">
                    <Borrow members={getBorrowers()} />
                </Tab>
                <Tab eventKey="Earn" title="Earn" >
                    <ChatForm members={getEarnMembers()} />
                </Tab>
                <Tab eventKey="Charity" title="Charity" >
                    <ChatForm members={getCharities()} />
                </Tab>
                <Tab eventKey="Play" title="Play" >
                    <ChatForm members={getPlayers()} />
                </Tab>
                <Tab eventKey="Validators" title="Validators" >
                    <ChatForm members={getValidators()} />
                </Tab>
            </Tabs>

        </>
    );
}

export default Chat;