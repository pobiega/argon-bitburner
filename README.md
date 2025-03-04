
# About

You can find the Javascript code in the `/dist` folder for reference.

All of the ingame `.js` scripts are executables and can be run with e.g. `run scan.js --help`.
Each of the scripts has a `--help` flag for explaination on how to use it.

Make sure to manually copy the `*.script` scripts into your home root folder.

## Some usefull commands

```
run dist.js n00dles foodnstuff --take 0.1 --scale 0.5 --tail
```

Good for starting.
Will start attacking `n00dles` and `foodnstuff`. 
It will grow servers to `moneyMax` and `take` `10%` of the the servers `moneyMax`.
Will automatically buy / upgrade servers with `scale` `50%` of your current money as available money (optional).
And it will display a monitor with `--tail`.

```
run dist.js --take 0.9 --boost --aggro --cap 2PB --share --free 64 --tail
```

![](doc/dist_example.png)

Good for mid / late game.
Will `boost` scheduled work, so more work is produced.
By using `aggro` a more aggressive distribution method is used, where more script instances are spawned. 
The `cap` is a safety mechanism so a maximum of `2PB` will be used, because `boost` and `aggro` with a lot of available ram capacity can crash the game.
Any unused ram (ignores `cap`) will be used for `ns.share()` scripts.
At your home computer there will be minimum of `64`GB `free` ram. 
And it will display a monitor with `--tail`.

```
run scan.js isHackable true --filter moneyMax --filter moneyRank --sort moneyMax --desc
```

Will display all `isHackable` servers `moneyMax` and `moneyRank` value only and sort by highest `moneyMax` first.

```
run scan.js files .cct --filter files --filter path
```

Will show servers with certain `files`.

```
run scan.js hostname cave --filter path
```

Will show you where to look for `The Cave`

```
run scan.js requiredHackingSkill <=getPlayer().hacking
```

Will look for servers where `requiredHackingSkill` is lower or equal `ns.getPlayer().hacking`.
All ns functions without an argument are supported (also other namespaces). 

```
run scan.js isHackable true --cat moneyfarm --filter moneyMax --filter moneyRank --filter serverGrowth --filter minDifficulty --sort moneyMax --desc
```

![](doc/scan_example.png)

Look for viable targets to attack.

```
run purchase.js --max
```

![](doc/purchase_prompt.png)

Will buy or upgrade private servers with the `maximum` amount ram you can afford.

```
run node.js --tail
```

Will automatically buy or upgrade Hacknet Nodes.

```
run cct.js
```

Will look for `Coding Contract` files `.cct` and try to solve them.

```
run stats.js
```

![](doc/stats_example.png)

Will display some information in the Overview panel.

# Development and Installation

## Official VS Code Template for Bitburner

https://github.com/bitburner-official/vscode-template

## Extension Recommendations
[vscode-bitburner-connector](https://github.com/bitburner-official/bitburner-vscode) ([vscode extension marketplace](https://marketplace.visualstudio.com/items?itemName=bitburner.bitburner-vscode-integration)) to upload your files into the game

[vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to use live linting in editor

[auto-snippet](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.auto-snippet) to automate inserting the file template in `.vscode/snippets.code-snippets`

There is a workspace file in `.vscode` which contains the recommended settings for all of these

## Dependencies
[Node.js](https://nodejs.org/en/download/) required for compiling typescript and installing dependencies

## Installation
```
git clone https://github.com/4rg0n/bitburner.git
npm install
npm run defs
```

## Getting Started
Write all your typescript source code in the `/src` directory

To autocompile as you save, run `npm run watch` in a terminal

To update your Netscript Definitions, run `npm run defs` in a terminal

Press F1 and Select `Bitburner: Enable File Watcher` to enable auto uploading to the game

If you run `watcher.js` in game, the game will automatically detect file changes and restart the associated scripts

## Imports
To ensure both the game and typescript have no issues with import paths, your import statements should follow a few formatting rules:

 * Paths must be absolute from the root of `src/`, which will be equivalent to the root directory of your home drive
 * Paths must contain no leading slash
 * Paths must end with no file extension

 ### Examples:

To import `helperFunction` from the file `helpers.ts` located in the directory `src/lib/`: 

```js
import { helperFunction } from 'lib/helpers'
```

To import all functions from the file `helpers.ts` located in the `src/lib/` directory as the namespace `helpers`:

```js
import * as helpers from 'lib/helpers'
```

To import `someFunction` from the file `main.ts` located in the `src/` directory:

```js
import { someFunction } from 'main'
```

## Debugging

For debugging bitburner on Steam you will need to enable a remote debugging port. This can be done by rightclicking bitburner in your Steam library and selecting properties. There you need to add `--remote-debugging-port=9222` [Thanks @DarkMio]

In VS Code press `F5` or goto `Run -> Start Debugging` to connect VS Code with Bitburner.
You can then set [breakpoints in VS Code](https://code.visualstudio.com/docs/editor/debugging#_breakpoints) as usual.

When debugging you see errors like the following:

```
Could not read source map for file:///path/to/Steam/steamapps/common/Bitburner/resources/app/dist/ext/monaco-editor/min/vs/editor/editor.main.js: ENOENT: no such file or directory, open '/path/to/Steam/steamapps/common/Bitburner/resources/app/dist/ext/monaco-editor/min/vs/editor/editor.main.js.map'
```

These errors are to be expected, they are referring to the game's files and the game does not come packaged with sourcemaps.

# Credits to

* [OrangeDragon](https://github.com/OrangeDrangon) for his [Contract Solver](https://gist.github.com/OrangeDrangon/8a08d2d7d425fddd2558e1c0c5fae78b)
* [zc](https://steamcommunity.com/profiles/76561198062278367) for his [Contract Guide](https://steamcommunity.com/sharedfiles/filedetails/?id=2712741294/)
* [Baizey](https://github.com/Baizey) for his [Distribution Scripts](https://github.com/Baizey/BitBurner/tree/master/old)  