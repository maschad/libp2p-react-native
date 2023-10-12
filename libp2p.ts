import {createLibp2p} from 'libp2p';
import {tcp} from '@libp2p/tcp';
import {yamux} from '@chainsafe/libp2p-yamux';
import {noise} from '@chainsafe/libp2p-noise';
import {mdns} from '@libp2p/mdns';
import {bootstrap} from '@libp2p/bootstrap';

export const node = await createLibp2p({
  transports: [tcp()],
  streamMuxers: [yamux()],
  connectionEncryption: [noise()],
  peerDiscovery: [
    mdns({
      interval: 1000,
    }),
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
