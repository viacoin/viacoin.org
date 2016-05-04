---
layout: post_page_comment
title: Peter Todd - Development Update
---

#### CHECKLOCKTIMEVERIFY - Reference implementation and BIP draft written

I just
[posted](http://www.mail-archive.com/bitcoin-development@lists.sourceforge.net/msg06250.html)
the first stage of my work implementing the new `CHECKLOCKTIMEVERIFY` opcode to
the Bitcoin development mailing list for peer review. This first stage involves
a [reference
implementation](https://github.com/petertodd/bitcoin/compare/checklocktimeverify),
a full set of unittests, and a [draft
BIP](https://github.com/petertodd/bips/blob/checklocktimeverify/bip-checklocktimeverify.mediawiki).
Assuming the peer review goes well and no objections are raised to the opcode
itself the next step is to plan in detail exactly how the upgrade will happen
and how we will test that upgrade in advance.


#### So what's CHECKLOCKTIMEVERIFY all about anyway?

Right now in Viacoin and all other Satoshi-derived crypto-currencies you're
able to create a transaction that can't be mined until some point in the future
using a feature called `nLockTime`. This feature is used as a building block
for a lot of other protocols, including micropayment channels, escrows,
2-factor wallets, etc. The problem is `nLockTime` usually doesn't do what we
actually want to do: make sure a transaction *can't* be spent a certain way
until some time in the future. `CHECKLOCKTIMEVERIFY` fixes this problem by
putting the time controls of when coins can be spent into the scripting
language itself. In addition, since the timelocking is done at the script level
rather than transaction level we also protect these protocols against
[transaction malleability](https://bitcoin.org/en/developer-guide#transaction-malleability).


#### Why is all this written for Bitcoin, not Viacoin?

Bitcoin and Viacoin share a common codebase, and most of the top minds in the
crypto-currency space are involved in Bitcoin Core development, myself
included. Running new features and new ideas past that group is excellent peer
review. In fact, an important part of the design of `CHECKLOCKTIMEVERIFY` is a
clever idea from Bitcoin Core Developer Gregory Maxwell! Of course with the
"slow and steady" speed at which Bitcoin Core moves it's almost certain that
Viacoin will implement `CHECKLOCKTIMEVERIFY` first.


#### What's going on with treechains?

When I was in London last month I got the chance to speak to one of the
Bitmessage devs. To make a long story short, it looks like Bitmessage will make
a great "version zero" application for treechains to start testing out the
basics of the idea in a real application. You can expect to see some code by
the end of this month. Also, if you're in Israel Oct 19th-20th, I'll be
speaking at the [Inside Bitcoins conference](http://bitcointlv.com) about
treechains.

Peter Todd