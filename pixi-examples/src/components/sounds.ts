import {Howl, Howler} from 'howler';

import echoDng from '../assets/sound/echo-dungeon-70538.mp3';
import dngIntro from '../assets/sound/walk-to-dungeon-69897.mp3';
import doorCracking from '../assets/sound/door-creaking-121673.mp3';
import walking from '../assets/sound/walking-sound-effect-272246.mp3';
import punch from '../assets/sound/punch-04-383965.mp3';
import sliding from '../assets/sound/sliding-chair-47711.mp3';
import successEnd from '../assets/sound/success-fanfare-trumpets-6185.mp3';
import badEnding from '../assets/sound/verloren-89595.mp3';


const echoDngSound = new Howl({
    src: echoDng,
    loop: true,
});

const dngIntroSound = new Howl({
    src: dngIntro
});

const doorCrackingSound = new Howl({
    src: doorCracking,
});

const walkingSound = new Howl({
    src: walking
});

const punchSound = new Howl({
    src: punch
});

const slidingSound = new Howl({
    src: sliding
});

const successSound = new Howl({
    src: successEnd,
});

const badEndingSound = new Howl({
    src: badEnding
});

const sounds = {
    echoDngSound,
    dngIntroSound,
    doorCrackingSound,
    walkingSound,
    punchSound,
    slidingSound,
    successSound,
    badEndingSound
}

export default sounds;