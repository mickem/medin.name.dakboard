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

## Hoe does metrics work?

* First you need to send a metric from Homey (before you can use it in Dakboard)
* Select the "Add metric" card from the DakBoard app
* In name you specify the name of the metric
* The value should be the numerical value
* Next run this flow
* In dakboard create a "Graphs & External Data" > "Metriocs Data"
* Pick the name you specified in the flow.

## Donate
If you like the app, consider buying me a beer!  
[![Paypal donate][pp-donate-image]][pp-donate-link]

## Changelog

### Building the project

```
npm install -g homey
homey app run
```

[pp-donate-link]: https://www.paypal.me/michaelmedin
[pp-donate-image]: https://www.paypalobjects.com/webstatic/en_US/i/btn/png/btn_donate_92x26.png
