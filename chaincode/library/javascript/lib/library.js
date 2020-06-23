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
/* 
    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }
 */
    async createBook(ctx, bookNumber, title, author, publisher) {

        const car = {
            title,
            docType: 'book',
            author,
            publisher,
        };

        await ctx.stub.putState(bookNumber, Buffer.from(JSON.stringify(book)));
    }

    async queryAllBooks(ctx) {
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
    
/* 
    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }
 */
}


 module.exports = Library;
