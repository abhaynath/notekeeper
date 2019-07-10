/**
* This file contains Song and JukeBox classes.
* It holds all the logic for playing songs.
*/
class Song {
    private duration: number = 0;
    constructor(private artist: string, private title: string) {
        this.setDuration(5.6);

    }
    /**
    * @description This function will play the current song
    */
    play() {
        console.log("Playing => " + this.title + " by " + this.artist + "(" + this.duration + ")");
    }
    /**
    *
    * @param duration The duration for which the song will be played.
    */
    setDuration(duration: number) {
        this.duration = duration;
    }
    /**
    * Returns the average of two numbers.
    *
    * @remarks
    * This method is part of the sample code.
    *
    * @param x - The first input number
    * @param y - The second input number
    * @returns The arithmetic mean of `x` and `y`
    *
    * @beta
    */
    getAverage(x: number, y: number) {
        return (x + y) / 2.0;
    }

}

class JukeBox {
    constructor(private songs: Song[]) {

    }
    play() {
        const song = this.getRandomSong();
        song.play();
    }
    private getRandomSong() {
        const songCount: number = this.songs.length;
        const songIndex: number = Math.floor(Math.random() * songCount);
        return this.songs[songIndex];

    }
}

const songs = [new Song("Jagjit Singh", "Jab kisise koi gila rakhana"),
new Song("Kishor Kumar", "Wo sham khuch ajib thi"),
new Song("Shreya Ghoshal", "Jadu hai nasha hai"),
new Song("Lata Mangeshkar", "Lag ja galein")];

const jukebox = new JukeBox(songs);
jukebox.play();