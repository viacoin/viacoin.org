---
layout: post_page_comment
title: Viacoin 0.10.6.4
---

*Viacoin Core 0.10.6.4* has been released. This version adds 'auxpow' support required for merged mining with any scrypt based crypto and also implements CHECKLOCKTIMEVERIFY.

Merged mining allows Viacoin to be mined simultaneously with other scrypt based blockchains so rather than competing for hashing power, it can be shared. This will significantly raise the security of the Viacoin and provide additional revenue streams for miners who rather than deciding which scrypt coin to mine, can mine Viacoin together with as many others as required.

[BIP65](https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki) CHECKLOCKTIMEVERIFY provides a reliable way to make payments which are not spendable until a certain time in the future. This technology has a vast array of applications include [hub and spoke micropayments](https://www.mail-archive.com/bitcoin-development@lists.sourceforge.net/msg06576.html), complex escrow and can even replace the need for lawyers in inheritance trusts.

Viacoin also incorporates the latest improvements from Bitcoin Core 0.10 which includes headers first syncronization, addrindex, deterministic signatures, HTTP REST interface, `viacoin-tx` command as well as many optimizations and modularization.

#### Download instruction

Full download and release notes are available the Official [Viacoin Github](https://github.com/viacoin/viacoin/releases/tag/v0.10.6.4) repository.

#### Upgrade instruction

Merged mining will be available from block 551,885 (25th December 2014) and CHECKLOCKTIMEVERIFY will be activated from block 598,725 (7th January 2015). **The upgrade is mandatory** in order for you to continue using the wallet or continue mining.

Remember to backup your wallet *before* performing the upgrade as a safety precaution: Windows/Mac and clients you can do this from File->Backup Wallet, or otherwise copy your wallet.dat file.

The first time you open Viacoin after the backup you will need to reindex the blockchain which primes the database for merged mining. Windows and Mac OSX users will be prompted on next restart. Those running `viacoind` should restart the daemon once with the additional `-reindex` flag. 

#### Important notes

*If you compile from the git repo source, please make sure you `git checkout v0.10.6.4`. The source code tarball can also be obtained from the link above.*

The merged mining RPC API will not be activated until the hard fork transitions.

**If you are a pool or service that requires advance notification of upgrades and new versions, please complete [this form](http://goo.gl/forms/ByRtRppSQ3)**.

#### Testing

If you would like to test merged mining or experiment with CHECKLOCKTIMEVERIFY ahead of the planned fork on mainnet, you can do so immediately on the [Viacoin testnet](http://testnet.explorer.viacoin.org).

#### Bug reports

If you have any bug reports, please file them on the [Viacoin issue tracker](https://github.com/viacoin/viacoin/issues).

#### Credits

We would like to thank the crontributors to the Viacoin project who have made this release possible and especially would like to acknowlegde the hard work of [Bitcoin developers](https://github.com/graphs/contributors) and testers, too numerous to mention, for the many improvements to the Bitcoin protocol and reference client which provides the basis for Viacoin.

*Edit: updated links to 0.10.6.4 and updated merged mined start time*
