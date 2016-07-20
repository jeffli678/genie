"use strict";
var $action = $action || {};
(function ($action) {
    // Interface for UIs
    class UI {
        constructor() {

        }

        init() {}

        show() {}

        hide() {}

        remove() {}

        appendCommand(dom, commandCount) {}

        removeCommand(dom, commandCount) {}
        
        updateCommandState(state) {}
    }

    class CommandItem {
        constructor(command) {
            this.command = command;
        }

        get Command() {
            return this.command;
        }

        get DOM() {}

        init() {};

        /**
         * A label string to use for the command item
         * @private
         * @property undefined
         */
        label() {}
    };

    class KeyboardUICommandItem extends CommandItem {
        constructor(command) {
            super(command);
            this.init();
        }

        get DOM() {
            return this._domElement;
        };

        init() {
            var listItem = document.createElement("li");
            var action = this.command.EventType != 'default' ? this.command.EventType : $action.ActionableElementsActionLabel[this.command.Element.tagName];
            listItem.classList.add("action-search-list-item");

            var label = action + " the " + this.label(this.command.Element) + " " + $action.TagEnglishWordMappings[this.command.Element.tagName.toLowerCase()];
            listItem.textContent = label;
            listItem.addEventListener("click", this.command.execute(), null, false, true); // Must pass in these arguments so that the addEventListener override knows to ignore this registration. 

            this._domElement = listItem;
        }

        /**
         * Return a suitable label for the command
         */
        label() {
            var tagname = this.command.Element.tagName;
            if (tagname != "IFRAME") { // Cannot request contents of iframe due to cross origin frame error
                var label = "";
                if ($action.CommandLabels[tagname]) {
                    label = $action.CommandLabels[tagname](this.command.Element);
                } else {
                    label = jQuery(this.command.Element).contents().first().text().trim();
                }

                if (label && label.length > 0) {
                    return label;
                }
            }
            return "";
        };
    };

    $action.KeyboardUICommandItem = KeyboardUICommandItem;

    class KeyboardUI {
        constructor() {
            this.dialog = undefined;
            this.init();
        }

        init() {
            var dialog = document.createElement("div");
            dialog.classList.add("action-search");
            var list = document.createElement("ul");
            list.classList.add("action-search-list");

            var label = document.createElement("div");
            label.classList.add("action-search-label");

            dialog.appendChild(label);
            dialog.appendChild(list);
            $('html').append(dialog);

            this.dialog = dialog;
            this.list = list;
            this.label = label;

            this.hide();
            $(window).scroll(_.throttle(this.repositionDialog, 1));
            this.repositionDialog();
        };

        repositionDialog() {
            var dialog = $('.action-search');

            var scrollTop = $(window).scrollTop();
            var top = $(window).height() + scrollTop - dialog.height();
            dialog[0].style.top = top + "px";
        };

        show() {
            this.dialog.style.display = "";
        };

        hide() {
            this.dialog.style.display = "none";
        };

        remove() {
            $('.action-search').remove();
            $(window).unbind("scroll", this.repositionDialog);
        }

        /**
         * Append a command to the dialog
         */
        appendCommand(command, commandCount) {
            var newCommand = new $action.KeyboardUICommandItem(command)
            command.CommandItem = newCommand;

            if (!command.userInvokeable()) {
                newCommand.DOM.classList.add('action-search-disabled');
            }

            this.list.appendChild(newCommand.DOM);


            this.label.textContent = "There were " + commandCount + " actions found ...";
            return newCommand;
        }

        /**
         * Remove a command from the dialog
         */
        removeCommand(command, commandCount) {
            var cmdItem = command.CommandItem;
            if (cmdItem && cmdItem.DOM) {
                this.list.removeChild(cmdItem.DOM);
                this.label.textContent = "There were " + commandCount + " actions found ...";
            }
        }
        
        updateCommandState(command, enabled) {
            var domElement = command.CommandItem.DOM; 
            var disabled = $(domElement).hasClass('action-search-disabled'); 
            if(disabled && enabled){
                $(domElement).removeClass('action-search-disabled'); 
            }
            
            if(!disabled && !enabled){
                $(domElement).addClass('action-search-disabled'); 
            }
        }
    };

    $action.KeyboardUI = KeyboardUI;
})($action);