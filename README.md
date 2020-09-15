# Homey DAKBoard client

A DAKBoard client which can be used to interact with DAKBoards and update blocks and contents.
Early version so currently only text blocks (update text) and generic blocks (enable/disable) are supported.
Requires a DAKBoard PLUS Subscription as it use the DAKBoard API.

## Supported Devices

* Any PLUS enabled dak board accounts

## How do I get it to work?
* Add a device (corresponding to the block you want to update).
* Enter the API key along the way.
* Use action cards to update text and enable/disable blocks.

## Roadmap
This is an early beta version, so currently the features are limited to updating text bloks and enabling/disabling blocks.
Please also note that the DAKBoard is very limited.

## Donate
If you like the app, consider buying me a beer!  
[![Paypal donate][pp-donate-image]][pp-donate-link]

## Changelog

### Version 1.0.0
* Application released

## Help out

### Translations

The project translations are managed at https://poeditor.com/join/project/frV5jaW4lg
You can add languages and help out with translations there.

### Building the project

This project is unlike most other Homey application in that is written in typescript and requires compilation.
Due to how athom has designed Homey application this is a bit akward, in essence the "application" has to reside in the root folder.
So we have to place the source code elsewhere, in this case it is located in the [projects folder](./project).
To build it you need [node installed](https://nodejs.org/en/download/).
Then you can run:
```
cd project
npm install
npm run build
```

Then to run the application on your homey you:
```
cd ..
homey app run
```
Please note that building the application is don from *project* folder and running the application is done from *root* folder.
A lot of the files are "the same" but not quite so it has to be in these folder or it wont work.

[pp-donate-link]: https://www.paypal.me/michaelmedin
[pp-donate-image]: https://www.paypalobjects.com/webstatic/en_US/i/btn/png/btn_donate_92x26.png
