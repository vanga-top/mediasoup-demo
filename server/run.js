const fs = require('fs');
const child_process = require('child_process');

const workBin = '/Users/chenhui/github/mediasoup/worker/out/Release/mediasoup-worker';
const spawnArgs  = ['--logLevel=warn',
                '--logTag=info',
                '-logTag=ice',
                '--logTag=dtls',
                '--logTag=rtp',
                '--logTag=srtp',
                '--logTag=rtcp',
                '--logTag=rtx',
                '--logTag=bwe',
                '--logTag=score',
                '--logTag=simulcast',
                '--logTag=svc',
                '--logTag=sctp',
                '--rtcMinPort=40000',
                '--rtcMaxPort=49999'];

let child =  child_process.spawn(
    workBin,
    spawnArgs,
    {
        env :
        {
            MEDIASOUP_VERSION : '__MEDIASOUP_VERSION__',
        },

        detached : false,

        // fd 0 (stdin)   : Just ignore it.
        // fd 1 (stdout)  : Pipe it for 3rd libraries that log their own stuff.
        // fd 2 (stderr)  : Same as stdout.
        // fd 3 (channel) : Producer Channel fd.
        // fd 4 (channel) : Consumer Channel fd.
        // fd 5 (channel) : Producer PayloadChannel fd.
        // fd 6 (channel) : Consumer PayloadChannel fd.
        stdio       : [ 'ignore', 'pipe', 'pipe', 'pipe', 'pipe', 'pipe', 'pipe' ],
        windowsHide : true
    });

console.log(child.pid);