---
layout: post_page_comment
title: BIP66 soft-fork
---

Viacoin Core 0.10.7 will implement implement [BIP66](https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki) which is a soft-forking change to prohibit non-DER signatures. 

BIP66 is being implemented because of recent changes in the way OpenSSL parses
signatures. Viacoin Core uses OpenSSL to check signatures to make sure they're valid, 
but OpenSSL used to accept signatures using multiple different types of encodings. 
Once BIP66 is fully implemented, there will only be one valid way to encode a Viacoin 
signature (the DER encoding).

This change breaks the dependency on OpenSSL's signature parsing, and is a stepping 
stone to removing all dependencies of OpenSSL from the consensus code.

It is a soft-fork which relies on the miner-voting where 75% of miners agree 
to the change at which point the new consensus rule becomes active for those blocks. 
When 95% of blocks have version number 4 or higher, it becomes mandatory for all 
blocks.
