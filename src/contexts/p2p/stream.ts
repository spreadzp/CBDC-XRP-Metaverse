/* eslint-disable no-console */

import { pipe } from 'it-pipe'
import * as lp from 'it-length-prefixed'
import map from 'it-map'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'

export async function stdinToStream(stream: any, userAddress: string, amount: number, typeRequest: string) {
    // Read utf-8 from stdin
   process.stdin?.setEncoding('utf8')
   await pipe(
        // Read from stdin (the source)
        [userAddress, amount, typeRequest],
        // Turn strings into buffers
        (source) => map(source, (data) => uint8ArrayFromString(data.toString())),
        // Encode with length prefix (so receiving side knows how much data is coming)
        lp.encode(),
        // Write to the stream (the sink)
        stream.sink
    )  
}

export async function streamToConsole(stream: any, output: any) {
   await  pipe(
        // Read from the stream (the source)
        stream.source,
        // Decode length-prefixed data
        lp.decode(),
        // Turn buffers into strings
        (source) => map(source, (buf) => uint8ArrayToString(buf.subarray())),
        // Sink function
        async function (source: any) {
            // For each chunk of data
            for await (const msg of source) {
                // Output the data as a utf8 string
                console.log('> ' + msg.toString().replace('\n', ''))
                output(msg.toString())
            }
        }
    )
}
