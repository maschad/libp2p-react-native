import {createLibp2p} from 'libp2p';
import {yamux} from '@chainsafe/libp2p-yamux';
import {noise} from '@chainsafe/libp2p-noise';
import {bootstrap} from '@libp2p/bootstrap';
import {webSockets} from '@libp2p/websockets';

export const node = await createLibp2p({
  transports: [webSockets()],
  streamMuxers: [yamux()],
  connectionEncryption: [noise()],
  peerDiscovery: [
    bootstrap({
      list: [
        // A list of bootstrap peers to connect to starting up the node
        '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
        '/dnsaddr/bootstrap.libp2p.io/ipfs/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
        '/dnsaddr/bootstrap.libp2p.io/ipfs/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
      ],
    }),
  ],
});
