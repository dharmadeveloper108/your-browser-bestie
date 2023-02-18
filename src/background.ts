
const persistBrowserStartTime = () => {
    chrome.runtime.onStartup.addListener(() => {
        const startTime = new Date().toString();
        chrome.storage.sync.set({"startTime": startTime });
    });
}

const calculateActiveTime = (startTime : string)  : string => {
    const startTimeParsed = new Date(startTime);
    const now = new Date();
    const timeDifferenceFromNow = Math.abs((startTimeParsed.getTime() - now.getTime())) / 1000;

    return Math.floor(timeDifferenceFromNow).toString();
}

const getWiseWords = () => { 
    return [
    `Have you been outside today? 🤨 (actually outside, not just to take out the trash or shout at the elderly upstairs neighbour who keeps blasting badly dubbed soap operas). Go touch some grass.`,
    `Hello little racoon baby. Basking in the blue light as usual huh? What about getting some Vitamin D in the other light, the one that’s actually beneficial you know… 🌞`,
    `Wadup bb. I’d call you a silly goose but geese are actually hydrated: when was the last time you had a sip of water today? Sip sip sip 💦`,
    `Browser has been going bzz bzz for a long time 🔫 go have some water or I’ll show everyone your browser history next time you’re sharing your screen on a video call. I mean it. Don’t think that I can’t. Gooooo`,
]}

const pickRandomSentence = () => {
    const wiseWords = getWiseWords();
    let wiseWordsCopy = wiseWords.slice(0);

    if (wiseWordsCopy.length <= 1) {
        wiseWordsCopy = wiseWords.slice(0);
    }
    var index = Math.floor(Math.random() * wiseWordsCopy.length);
    var item = wiseWordsCopy[index];
    wiseWordsCopy.splice(index, 1);
    return item;
}

const generateNewRandomAlarm = () => {
    const randomHourInterval = Math.floor(Math.random() * (5 - 1 + 1) + 1);
    const randomIntervalToMinutes = randomHourInterval * 60;
    chrome.alarms.create({ delayInMinutes: randomIntervalToMinutes });
}

const triggerNotificationOnAlarm = () => {
    chrome.alarms.onAlarm.addListener(() => {     
        chrome.storage.sync.get(["startTime"], function(storedDate){
            const activeTime = calculateActiveTime(storedDate.startTime);
            
            if(activeTime !== 'NaN') {
                chrome.notifications.create('smth', {
                    title: `Browser open since ${calculateActiveTime(storedDate.startTime)} hours`,
                    message: pickRandomSentence(),
                    iconUrl: 'bestie.png',
                    type: 'basic',
                    priority: 2,
                });
            }
        });
    });
    chrome.notifications.onClosed.addListener(() => {
        generateNewRandomAlarm();
    });
}

async function main() {
    persistBrowserStartTime();
    generateNewRandomAlarm();
    triggerNotificationOnAlarm();
}

main();
