# Bay Clock 2

Bay Clock is a website that shows the current schedule and block for the Bay School of San Francisco.

View it Here: [https://www.bayclock.org/](https://www.bayclock.org/)

Made with [Vue3](https://vuejs.org/), [Quasar](https://quasar.dev/), and [Typescript](https://www.typescriptlang.org/)

## Features

- Date and Time
- Block Countdown
- Special Schedule Indicator
- Breaks and Immersives
- Live Progress Bars
- Useful Links
- Lunch Menu
- Customizable Blocks
- Lots and Lots of Customizable Styles (over 150 colors)!
- Homework Timers
- Weekly Schedule
- Dark Mode

## Maintaining

### Manually Updating the Schedule:

In order to update the schedule you must edit the `schedule.json` file located in the `src/data/schedules` folder. The `schedule.json` file is formatted into a dictionary with days of the week as the keys, and the corresponding schedule as the value. The schedule dictionary has the block name as the keys and a dictionary with the start minute and hour, as well as the end minute and hour.

Monday's schedule for example:
````json
"Mon": {
    "Morning Meeting": {
        "start": {"hour": 8, "minute": 30},
        "end": {"hour": 8, "minute": 50}
    },
    "A": {
        "start": {"hour": 8, "minute": 55},
        "end": {"hour": 10, "minute": 10}
    },
    "B": {
        "start": {"hour": 10, "minute": 15},
        "end": {"hour": 11, "minute": 30}
    },
    "Lunch": {
        "start": {"hour": 11, "minute": 30},
        "end": {"hour": 12, "minute": 30}
    },
    "C": {
        "start": {"hour": 12, "minute": 30},
        "end": {"hour": 13, "minute": 45}
    },
    "D": {
        "start": {"hour": 13, "minute": 50},
        "end": {"hour": 15, "minute": 5}
    },
    "Tutorial": {
        "start": {"hour": 15, "minute": 5},
        "end": {"hour": 15, "minute": 35}
    }
},
````
### Adding a Special Schedule:
In order to update the schedule you must edit the `special_schedules.json` file located in the `src/data/schedules` folder. Special schedules are formatted the same as normal schedules, but the key to the schedule is a date instead of a weekday. Dates should be written as `YYYY/MM/DD`.

Special schedule entry for Jan 1, 2023 as an example:
```json
"2023/1/1": {
    "Morning Meeting": {
        "start": {"hour": 8, "minute": 30},
        "end": {"hour": 8, "minute": 50}
    },
    "A": {
        "start": {"hour": 8, "minute": 55},
        "end": {"hour": 10, "minute": 10}
    },
    "B": {
        "start": {"hour": 10, "minute": 15},
        "end": {"hour": 11, "minute": 30}
    },
    "Lunch": {
        "start": {"hour": 11, "minute": 30},
        "end": {"hour": 12, "minute": 30}
    },
    "C": {
        "start": {"hour": 12, "minute": 30},
        "end": {"hour": 13, "minute": 45}
    },
    "D": {
        "start": {"hour": 13, "minute": 50},
        "end": {"hour": 15, "minute": 5}
    },
    "Tutorial": {
        "start": {"hour": 15, "minute": 5},
        "end": {"hour": 15, "minute": 35}
    }
}
```
### Editing Immersives
In order to update the immersives' start and end dates and schedule you must edit the `immersives.json` file located in the `src/data/schedules` folder. The starting and ending dates of the immersives are located in a dictionary with the immersive number as the key. The immersive schedule is located in a dictionary with the key `Schedule`.

Here is an example of the starting and ending dates for an immersive:
```json
"Immersive1": {"start": "2023/1/5", "end": "2023/1/26"},
```
Here is an example of an immersive schedule:
```json
"Schedule": {
    "Immersive Morning": {
        "start": {"hour": 9, "minute": 0},
        "end": {"hour": 11, "minute": 30}
    },
    "Lunch": {
        "start": {"hour": 11, "minute": 30},
        "end": {"hour": 12, "minute": 30}
    },
    "Immersive Afternoon": {
        "start": {"hour": 12, "minute": 30},
        "end": {"hour": 15, "minute": 0}
    }
}
```
### Adding/Editing Breaks:
In order to update  or add new breaks you must edit the `breaks.json` file located in the `src/data` folder. Each break is represented as a entry in the dictionary with the name of the break as the key and the start and end dates in a list as the value.

Here is an example break entry:
```json
"MLK Day": {"start": "2023/1/16", "end": "2023/1/17"}
```

### Updating the Lunch Menu:
In order to update the lunch menu you must replace the files in the `public/menu` folder. The images must be in .jpg format and should be named `1.jpg`, `2.jpg`, etc.
