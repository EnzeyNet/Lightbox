Lightbox
================

Angular directive to display a lightbox that is position and sized purely by CSS.
The lightbox will:
* Always remain centered.
* Never exceed 80% height and width of the window, specific size overrideable with CSS.
* Will attempt to be as small as possible.
* The HTML of the lightbox will not be in the DOM when it is not rendered.

Angular Module: net.enzey.lightbox

Live Example: http://EnzeyNet.github.io/Lightbox

### Directive Parameters

| Parameter Name | Description |
| -------------- | ----------- |
| nz-lightbox | The template to load with transcludion.
| show-event | The event the lightbox listens for to display itself.

### Lightbox Template Directive

| Directive Name | Description |
| -------------- | ----------- |
| lightbox-reject-action | Closes the lightbox. The lightbox will also emit the 'lightboxReject' event.
| lightbox-accept-action | Closes the lightbox. The lightbox will also emit the 'lightboxAccept' event, that also contains the $scope of the lightbox.


## Example Usage
```
<div nz-lightbox="warningDialog.html" show-event="displayModalDialogWithMask" modal>
    <span>My Message</span>
    <input ng-model="name" type="text" required />
</div>