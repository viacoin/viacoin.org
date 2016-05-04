---
layout: post_page_comment
title: Peter Todd - Development Update
---

#### CHECKLOCKTIMEVERIFY

As you may know CHECKLOCKTIMEVERIFY is now live on Viacoin testnet, and will go
live on Viacoin mainnet as of block 598,725, which should occur around January
7th, 2015. I've also submitted a
[pull-req](https://github.com/bitcoin/bitcoin/pull/5496) to Bitcoin Core to
make it possible to test CHECKLOCKTIMEVERIFY, although currently there is no
schedule for when it'll be adopted.

CHECKLOCKTIMEVERIFY is still far from finished. While Viacoin has the
flexibility to adopt it now, the process for adoption on Bitcoin is a lot
slower due to the much higher risks involved; we want to get it right the first
time. Part of that process is actually implementing CHECKLOCKTIMEVERIFY in real
applications to see if our ideas about how we'll use the feature match up with
reality.

To that end I recently created a CHECKLOCKTIMEVERIFY-using [micropayment
channel
demo](https://github.com/petertodd/checklocktimeverify-demos/blob/master/micropayment-channel.py).
Very early stuff - this is basically an overgrown unit test and the payment
validation code needs to be written - but I've succesfully tested it on on
Viacoin testnet.

I've also been discussing CHECKLOCKTIMEVERIFY with potential users of it like
the wallet GreenAddress. It's looking like CHECKLOCKTIMEVERIFY alone is not
sufficient for some important use-cases as it can only prevent a transaction
from being spent until a *specific* time in the future, rather than a relative
time. In GreenAddress's case that would mean any payments sent to older wallet
addresses won't be protected by two factor authentication; it also makes
generating addresses significantly more complicated. We're going to need a
second opcode to fix this issue cleanly and I've started work on what its
design needs to be.


#### Publications

I've spent a fair amount of time lately writing:

* [Near-zero fee transactions with hub-and-spoke micropayments](http://www.mail-archive.com/bitcoin-development@lists.sourceforge.net/msg06576.html)
* [Setting the record straight on Proof-of-Publication](http://www.mail-archive.com/bitcoin-development@lists.sourceforge.net/msg06570.html)
* [The relationship between Proof-of-Publication and Anti-Replay Oracles](http://www.mail-archive.com/bitcoin-development@lists.sourceforge.net/msg06617.html)

I highly recommend reading the latter two papers and (on-going) mailing list
discussion; Andrew Miller in particular makes some [interesting
points](http://www.mail-archive.com/bitcoin-development@lists.sourceforge.net/msg06637.html)
on the need for indexes of some kind in proof-of-publication systems. (an
important consideration in the nitty gritty details of how treechains will
need to work)


#### Core dev work

Almost all my work there has been related to CHECKLOCKTIMEVERIFY. I do however
have one non-CLTV bit of news: after over a year and a half [Discourage fee
sniping with
nLockTime](https://github.com/bitcoin/bitcoin/pull/2340#event-210292498)
finally got merged!


#### Barclay's Distributed Banking Summit

Earlier this month I attended the Barclays Distributed Banking Summit in
London - yes [that Barclays](http://www.barclays.com/). Had a lot of
interesting discussions with finance and regulatory types of how blockchains
and embedded consensus are going to change banking, and also developed a
quick-n-dirty proof-of-concept to better audit records with the blockchain,
[Uniquebits](https://github.com/petertodd/uniquebits). I also gave a [talk on
blockchain technology](https://www.youtube.com/watch?v=1gz5Wb97lfA) at
[CoinScrum](http://www.meetup.com/London-bitcoin-meetup/) while I was in
London.


#### Finally...

Happy Christmas! Personally my family doesn't make a big deal out of Christmas,
however we do have a long-standing family tradition that I'll be participating
in this evening: booking cheap flights on Christmas day.

Which means if you're going to the [31st Chaos Communication
Congress](http://events.ccc.de/congress/2014/wiki/Static:Main_Page) I might see
you there!


Peter Todd
