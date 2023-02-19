const storeBrowserStartTime = () => {
    const startTime = new Date().toString();
    chrome.storage.sync.set({"startTime": startTime });
}

const calculateActiveTime = (startTime : string)  : string => {
    const startTimeParsed = new Date(startTime);
    const now = new Date();
    const timeDifferenceFromNow = Math.abs((startTimeParsed.getTime() - now.getTime())) / 1000;

    return Math.floor(timeDifferenceFromNow).toString();
}

const getStaticWiseWords = () => { 
    return [
    `Have you been outside today? 🤨 (actually outside, not just to take out the trash or shout at the elderly upstairs neighbour who keeps blasting badly dubbed soap operas).`,
    `Hello little racoon baby. Basking in the blue light as usual huh? What about getting some Vitamin D in the other light, the one that’s actually beneficial you know… 🌞`,
    `Wadup bb. I’d call you a silly goose but geese are actually hydrated: when was the last time you had a sip of water today? Sip sip sip 💦`,
    `Browser has been going bzz bzz for a long time 🔫 go have some water or I’ll show everyone your browser history next time you’re sharing your screen on a video call. I mean it. Don’t think that I can’t. Gooooo`,
    `Hi ratty rat cutie!! 🐭 Wow long time on the internet today: good job at staring at a screen for so long! Please go touch some grass. Or look away fro a while at least.`
]}

const pickRandomSentence = () => {
    const wiseWords = getStaticWiseWords();
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
    const randomAmountHours = Math.floor(Math.random() * (6 - 3 + 1) + 3);
    const randomAmountMinutes = randomAmountHours * 60;
    chrome.alarms.create({ delayInMinutes: randomAmountMinutes });
}

const triggerNotificationOnAlarm = () => {
    chrome.alarms.onAlarm.addListener(async () => {  
        const storedDate = await chrome.storage.sync.get(["startTime"]);   
        const activeTime = calculateActiveTime(storedDate.startTime);

        chrome.notifications.create('smth', {
            title: `Browser open since ${activeTime} hours`,
            message: pickRandomSentence(),
            iconUrl: 'bestie.png',
            type: 'basic',
            priority: 2,
        });
    });
    chrome.notifications.onClosed.addListener(() => {
        generateNewRandomAlarm();
    });
}

function main() {
    storeBrowserStartTime();
    generateNewRandomAlarm();
    triggerNotificationOnAlarm();
}

main();
