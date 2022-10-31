import {toString, fromString} from 'uint8arrays'
import { createFromJSON, createFromPrivKey, createRSAPeerId, createFromProtobuf, createFromPubKey, createEd25519PeerId} from '@libp2p/peer-id-factory'
import PeerId from 'peer-id';

export async function getOrCreatePeerId() {
    let peerId
    try {
        const pi = localStorage.getItem('peerWallet');
        // eslint-disable-next-line
        if (pi) {
            const tmp= JSON.parse( pi)
            peerId = await createFromJSON(tmp)
            console.log("🚀 ~ file: createPeer.ts ~ line 12 ~ getOrCreatePeerId ~ peerId", peerId)
        } else {
            peerId = await createRSAPeerId()
            console.log("🚀 ~ file: createPeer.ts ~ line 14 ~ getOrCreatePeerId ~ peerId", peerId)
            console.info('Storing our peer id in local storage so it can be reused') 
                 // eslint-disable-next-line
                 localStorage.setItem('peerWallet',  JSON.stringify({id: peerId.type, privKey: peerId.privateKey, pubKey: peerId.publicKey})) 
        }

    } catch (err) {

        console.info('Could not get the stored peer id, a new one will be generated', err)
    }

    return peerId
}