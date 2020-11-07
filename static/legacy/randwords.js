#!/usr/bin/node

const words = require('./words.json');
const len = words.length;

// Prints X random words, with pre and post-fixed strings.
const prefix = 'Wow, ';
const postfix = '!';
const x = 5;

console.log(`${len} words loaded.`);
for( let i=0; i<x; i++ ){
    let w = Math.floor(Math.random()*len);
    console.log(`${prefix}${words[w]}${postfix}`);
}
