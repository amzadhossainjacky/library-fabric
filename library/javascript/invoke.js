/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main(query) {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        //console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('library');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        //await contract.submitTransaction('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom');
        //console.log('Transaction has been submitted');

        if(query[0] == '2'){

            //query results
            const result = await contract.evaluateTransaction('searchBook', query[1]);

            var data = JSON.parse(result.toString());
            console.log('\n');
            console.log('@@@@@@@@@@@@  ' + query[1] + ' Details'+'  @@@@@@@@@@@@');
            console.log(" ");
            console.log('BookId: '+query[1]);
            console.log('Title: '+data.title);
            console.log('Author: '+data.author);
            console.log('Publisher: '+data.publisher);
            console.log('\n');         
        }

        else if (query[0] == '3'){
            await contract.submitTransaction('createBook', query[1], query[2], query[3], query[4]);

            const result = await contract.evaluateTransaction('searchBook', query[1]);
            var data = JSON.parse(result.toString());
            console.log('\n');
            console.log('@@@@@@@@@@@@  ' + query[1] + ' Details'+'  @@@@@@@@@@@@');
            console.log(" ");
            console.log('BookId: '+query[1]);
            console.log('Title: '+data.title);
            console.log('Author: '+data.author);
            console.log('Publisher: '+data.publisher);
            console.log('\n');  
        }

        else if (query[0] == '4'){
            await contract.submitTransaction('changeAuthor', query[1], query[2]);

            const result = await contract.evaluateTransaction('searchBook', query[1]);
            var data = JSON.parse(result.toString());
            console.log('\n');
            console.log('@@@@@@@@@@@@  ' + query[1] + ' Details'+'  @@@@@@@@@@@@');
            console.log(" ");
            console.log('BookId: '+query[1]);
            console.log('Title: '+data.title);
            console.log('Author: '+data.author);
            console.log('Publisher: '+data.publisher);
            console.log('\n');  
        }

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

//main();

module.exports = main;
