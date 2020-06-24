/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Library extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const books = [
            {
                title: 'Never Eat Alone',
                author: 'Keith Ferrazzi',
                publisher: 'Doubleday',
            },
            {
                title: 'Quick Vocabulary',
                author: 'Taposh Kormokar',
                publisher: 'Doel',
            },
        ];

        for (let i = 0; i < books.length; i++) {
            books[i].docType = 'book';
            await ctx.stub.putState('BOOK' + i, Buffer.from(JSON.stringify(books[i])));
            console.info('Added <--> ', books[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    //all query

    async searchBook(ctx, bookId) {
        const bookAsBytes = await ctx.stub.getState(bookId); // get book from chaincode state
        if (!bookAsBytes || bookAsBytes.length === 0) {
            throw new Error(`${bookId} does not exist`);
        }
        console.log(bookAsBytes.toString());
        return bookAsBytes.toString();
    }

    async createBook(ctx, bookId, title, author, publisher) {

        const book= {
            title,
            docType: 'book',
            author,
            publisher,
        };

        await ctx.stub.putState(bookId, Buffer.from(JSON.stringify(book)));
    }

    async getAllBooks(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeAuthor(ctx, bookId, newAuthor) {

        const bookAsBytes = await ctx.stub.getState(bookId); // get book from chaincode state
        if (!bookAsBytes || bookAsBytes.length === 0) {
            throw new Error(`${bookAsBytes} does not exist`);
        }
        const book = JSON.parse(bookAsBytes.toString());
        book.author = newAuthor;

        await ctx.stub.putState(bookId, Buffer.from(JSON.stringify(book)));
    }
}


 module.exports = Library;
