> from [erikvoid's site][erikvoid's site]:

# Foxitive Extensions
10 Jun 2013
By Erik Vold

## On Scriptlets

I was working late last night on Sidebars for the [Add-on SDK][sdk], when I saw an email for [Bug 774065: Replace bookmarklets with “user-script buttons”][bug774065], and thought that’d be easy, plus I need a break from debugging.

So an hour and a half later I had created [Scriptlet for Firefox][scriptlet].

## Scriptlets

A Scriptlet is a new add-on type that is the combination of a button and a bookmarklet, and it can re-use any existing bookmarklet.

Typically I find that I lose my bookmarklets because they get lost in my mountain of bookmarks, so I never use them, even tho there are some useful ones out there, and they are extremely easy to make.

Scriptlets are much easier, for starters they are completely separated from bookmarks, but they also include toolbar buttons which can be moved to any part of the user interface that I want. This means that Scriptlets can be moved to the add-on bar, the navigation bar, toolbars, and lots of other places!

### How To Install Scriptlets

In order to install a Scriptlet, right-click on a bookmarklet, and click the ‘Make Scriptlet’ button. Once this is done you find the Script in <about:addons>.


### Scriptlets Provide Toolbar Buttons

Once you make a Scriptlet a toolbar button will be automatically added to your navigation bar (aka navbar). See the top right of your browser.


### Scriptlets Are Add-ons

Because Scriptlets are treated as first class add-ons, they can be managed in Firefox’s Add-on Manager. This will be where you enable/disable, or uninstall a Scriptlet.


### New Features For Scriptlets

One idea I’m thinking about is making the button a togglable button, this way Scriptlets will be automatically added to pages that you visit after the page loads. This will come after the SDK team launches the new UX modules near the end of Q2, which is coming soon.


### Links

- [Install Scriptlet from AMO](https://addons.mozilla.org/firefox/addon/scriptlet/)
- [Source Code](https://github.com/erikvold/scriptlet-jetpack)
- [Issue Tracker](https://github.com/erikvold/scriptlet-jetpack/issues)

Enjoy!

[erikvoid's site]: http://work.erikvold.com/addons/2013/06/10/on-scriptlets.html
[sdk]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/
[bug774065]: https://bugzilla.mozilla.org/show_bug.cgi?id=774065
[scriptlet]: https://addons.mozilla.org/firefox/addon/scriptlet/
