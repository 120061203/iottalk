!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.MidiConvert=t():e.MidiConvert=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var a=r[n]={exports:{},id:n,loaded:!1};return e[n].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){var n,a;n=[r(1),r(3),r(2)],a=function(e,t,r){return{parseParts:function(t,n){var a=e(t);return r(a,n)},parseTransport:function(r){var n=e(r);return t(n)}}}.apply(t,n),!(void 0!==a&&(e.exports=a))},function(e,t){function r(e){function t(e){var t=e.read(4),r=e.readInt32();return{id:t,length:r,data:e.read(r)}}function r(e){var t={};t.deltaTime=e.readVarInt();var r=e.readInt8();if(240==(240&r)){if(255==r){t.type="meta";var n=e.readInt8(),o=e.readVarInt();switch(n){case 0:if(t.subtype="sequenceNumber",2!=o)throw"Expected length for sequenceNumber event is 2, got "+o;return t.number=e.readInt16(),t;case 1:return t.subtype="text",t.text=e.read(o),t;case 2:return t.subtype="copyrightNotice",t.text=e.read(o),t;case 3:return t.subtype="trackName",t.text=e.read(o),t;case 4:return t.subtype="instrumentName",t.text=e.read(o),t;case 5:return t.subtype="lyrics",t.text=e.read(o),t;case 6:return t.subtype="marker",t.text=e.read(o),t;case 7:return t.subtype="cuePoint",t.text=e.read(o),t;case 32:if(t.subtype="midiChannelPrefix",1!=o)throw"Expected length for midiChannelPrefix event is 1, got "+o;return t.channel=e.readInt8(),t;case 47:if(t.subtype="endOfTrack",0!=o)throw"Expected length for endOfTrack event is 0, got "+o;return t;case 81:if(t.subtype="setTempo",3!=o)throw"Expected length for setTempo event is 3, got "+o;return t.microsecondsPerBeat=(e.readInt8()<<16)+(e.readInt8()<<8)+e.readInt8(),t;case 84:if(t.subtype="smpteOffset",5!=o)throw"Expected length for smpteOffset event is 5, got "+o;var u=e.readInt8();return t.frameRate={0:24,32:25,64:29,96:30}[96&u],t.hour=31&u,t.min=e.readInt8(),t.sec=e.readInt8(),t.frame=e.readInt8(),t.subframe=e.readInt8(),t;case 88:if(t.subtype="timeSignature",4!=o)throw"Expected length for timeSignature event is 4, got "+o;return t.numerator=e.readInt8(),t.denominator=Math.pow(2,e.readInt8()),t.metronome=e.readInt8(),t.thirtyseconds=e.readInt8(),t;case 89:if(t.subtype="keySignature",2!=o)throw"Expected length for keySignature event is 2, got "+o;return t.key=e.readInt8(!0),t.scale=e.readInt8(),t;case 127:return t.subtype="sequencerSpecific",t.data=e.read(o),t;default:return t.subtype="unknown",t.data=e.read(o),t}return t.data=e.read(o),t}if(240==r){t.type="sysEx";var o=e.readVarInt();return t.data=e.read(o),t}if(247==r){t.type="dividedSysEx";var o=e.readVarInt();return t.data=e.read(o),t}throw"Unrecognised MIDI event type byte: "+r}var i;0==(128&r)?(i=r,r=a):(i=e.readInt8(),a=r);var d=r>>4;switch(t.channel=15&r,t.type="channel",d){case 8:return t.subtype="noteOff",t.noteNumber=i,t.velocity=e.readInt8(),t;case 9:return t.noteNumber=i,t.velocity=e.readInt8(),0==t.velocity?t.subtype="noteOff":t.subtype="noteOn",t;case 10:return t.subtype="noteAftertouch",t.noteNumber=i,t.amount=e.readInt8(),t;case 11:return t.subtype="controller",t.controllerType=i,t.value=e.readInt8(),t;case 12:return t.subtype="programChange",t.programNumber=i,t;case 13:return t.subtype="channelAftertouch",t.amount=i,t;case 14:return t.subtype="pitchBend",t.value=i+(e.readInt8()<<7),t;default:throw"Unrecognised MIDI event type: "+d}}var a;stream=n(e);var o=t(stream);if("MThd"!=o.id||6!=o.length)throw"Bad .mid file - header not found";var u=n(o.data),i=u.readInt16(),d=u.readInt16(),c=u.readInt16();if(32768&c)throw"Expressing time division in SMTPE frames is not supported yet";ticksPerBeat=c;for(var s={formatType:i,trackCount:d,ticksPerBeat:ticksPerBeat},f=[],p=0;p<s.trackCount;p++){f[p]=[];var m=t(stream);if("MTrk"!=m.id)throw"Unexpected chunk - expected MTrk, got "+m.id;for(var v=n(m.data);!v.eof();){var y=r(v);f[p].push(y)}}return{header:s,tracks:f}}function n(e){function t(t){var r=e.substr(i,t);return i+=t,r}function r(){var t=(e.charCodeAt(i)<<24)+(e.charCodeAt(i+1)<<16)+(e.charCodeAt(i+2)<<8)+e.charCodeAt(i+3);return i+=4,t}function n(){var t=(e.charCodeAt(i)<<8)+e.charCodeAt(i+1);return i+=2,t}function a(t){var r=e.charCodeAt(i);return t&&r>127&&(r-=256),i+=1,r}function o(){return i>=e.length}function u(){for(var e=0;;){var t=a();if(!(128&t))return e+t;e+=127&t,e<<=7}}var i=0;return{eof:o,read:t,readInt32:r,readInt16:n,readInt8:a,readVarInt:u}}e.exports=function(e){return r(e)}},function(e,t,r){var n;n=function(){function e(e){var t=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],r=Math.floor(e/12)-1,n=e%12;return t[n]+r}function t(e,t,r){return Math.round(e/t*r)+"i"}function r(e){for(var t=e.slice(),r=1;r<t.length-1;r++){var n=t[r],a=t[r-1];if(0===n.deltaTime&&"noteOff"===n.subtype&&"noteOn"===a.subtype&&n.noteNumber===a.noteNumber){var o=n.deltaTime;n.deltaTime=a.deltaTime,a.deltaTime=o,t[r]=a,t[r-1]=n}}return t}return function(n,a){var o=n.header.ticksPerBeat;a="object"!=typeof a?{}:a,a.PPQ="undefined"==typeof a.PPQ?192:a.PPQ,a.midiNote="undefined"==typeof a.midiNote?!0:a.midiNote,a.noteName="undefined"==typeof a.noteName?!0:a.noteName,a.duration="undefined"==typeof a.duration?!0:a.duration,a.velocity="undefined"==typeof a.velocity?!0:a.velocity;for(var u=[],i=0;i<n.tracks.length;i++){var d=n.tracks[i],c=[],s=0;a.duration&&(d=r(d));for(var f=0;f<d.length;f++){var p=d[f];if(s+=p.deltaTime,"noteOn"===p.subtype){var m={ticks:s,time:s,note:p.noteNumber};if(a.midiNote&&(m.midiNote=p.noteNumber),a.noteName&&(m.noteName=e(p.noteNumber)),a.velocity){var v=p.velocity/127;m.velocity=v}c.push(m)}else if("noteOff"===p.subtype)for(var y=c.length-1;y>=0;y--){var l=c[y];if(l.note===p.noteNumber&&"undefined"==typeof l.duration){a.duration&&(l.duration=t(s-l.ticks,o,a.PPQ)),l.time=t(l.time,o,a.PPQ),delete l.note,delete l.ticks;break}}else"meta"===p.type&&"trackName"===p.subtype&&(trackName=p.text,trackName=trackName.replace(/\u0000/g,""))}c.length>0&&u.push(c)}return u}}.call(t,r,t,e),!(void 0!==n&&(e.exports=n))},function(e,t,r){var n;n=function(){return function(e){for(var t={},r=0;r<e.tracks.length;r++)for(var n=e.tracks[r],a=0;a<n.length;a++){var o=n[a];"meta"===o.type&&("timeSignature"===o.subtype?t.timeSignature=[o.numerator,o.denominator]:"setTempo"===o.subtype&&(t.bpm=6e7/o.microsecondsPerBeat))}return t}}.call(t,r,t,e),!(void 0!==n&&(e.exports=n))}])});