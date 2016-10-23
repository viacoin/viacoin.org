---
layout: post_page_comment
title: Peter Todd - Development Update
---

#### Core dev work

I've been doing a lot of work on the scripting system since my last dev update,
some highlights:

* [Discourage NOPs reserved for soft-fork upgrades](https://github.com/bitcoin/bitcoin/pull/5000#issuecomment-58889473)
* [Accept any sequence of PUSHDATAs in OP_RETURN outputs](https://github.com/bitcoin/bitcoin/pull/5079)
* [SCRIPT_VERIFY_MINIMALDATA unittests](https://github.com/bitcoin/bitcoin/commit/cd9114e5136ecc1f60baa43fffeeb632782f2353) (also see my [comments](https://github.com/bitcoin/bitcoin/pull/5065#issuecomment-59100744) on the pull-req)
* [Check against MANDATORY flags prior to accepting to mempool](https://github.com/bitcoin/bitcoin/pull/5253) - Fixed a DoS attack! Also see my related [post](http://www.mail-archive.com/bitcoin-development@lists.sourceforge.net/msg06466.html) on the bitcoin-dev mailing list.
* [BIP62/STRICTENC review and tests](https://github.com/bitcoin/bitcoin/pull/5247)
* [Discourage fee sniping with nLockTime](https://github.com/bitcoin/bitcoin/pull/2340#issuecomment-58617533) - The pull-req that just won't die. (or get merged)

Much of that work is related to Pieter Wuille's
[BIP62](https://github.com/bitcoin/bips/blob/master/bip-0062.mediawiki), which
aims to make it possible to create non-malleable transactions.


#### CHECKLOCKTIMEVERIFY

...is now [BIP65](https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki)!

Satisfying to see CHECKLOCKTIMEVERIFY wind its way through the review process;
in the words of Jeff Garzik "[CHECKLOCKTIMEVERIFY [is] meeting near-universal
approval.](https://twitter.com/jgarzik/status/532497686008967168)"


#### What's going on with treechains?

Since my last dev update I've been doing a lot of work developing a colored
coin specification/library for a client. While it's not directly work on
treechains, the underlying problem - proving that an asset is valid by
presenting a valid transaction history - is very closely related to what
real-world applications of treechains need. My philosophy has always been to
solve real problems first, as well as to avoid premature optimisation; colored
coins is both a real problem, and treechains is simply a technology to optimize
scalability. With that in mind my plan is to do further treechains development
after the colored coin work is further developed; porting the colored coin
library to treechains would be an excellent example use-case and would help
guide development in a useful direction.

The colored coin code will be released publicly soon; my client wants to delay
releasing it until they're ready to launch. Having said that, here's part of
that work, a new library to do efficient marshalling of cryptographic proofs:
[python-proofmarshal](https://github.com/petertodd/python-proofmarshal)


Peter Todd
