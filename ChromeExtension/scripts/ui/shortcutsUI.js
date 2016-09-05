"use strict";
var $action = $action || {};
(function ($action) {
    class ShortcutsUICommandItem extends $action.CommandItem {
        constructor(command, ui) {
            super(command, ui);
            this._hasLabel = true;
            this.init();
        }

        get DOM() {
            return this._domElement;
        };

        set HasLabel(hasLabel) {
            this._hasLabel = hasLabel;
        }

        get HasLabel() {
            return this._hasLabel;
        }

        init() {
            var argumentKeys = Object.keys(this.Command.ArgumentsMap);

            var command = document.createElement("div");
            command.classList.add("genie-shortcut-ui-command");

            var description = document.createElement("span");
            description.classList.add("genie-shortcut-ui-command-description");

            var label = document.createElement("span");
            label.classList.add("genie-shortcut-ui-command-label");

            var descriptionLabel = this.descriptionLabel();
            var imperativeLabel = this.firstImperativeLabel();
            if (!descriptionLabel.length && !imperativeLabel.length) {
                this.HasLabel = false;
            }

            if (imperativeLabel.length) {
                label.textContent = imperativeLabel;
                command.appendChild(label);
            }

            if (descriptionLabel.length) {
                description.textContent = descriptionLabel;
                command.appendChild(description);
            }

            if (descriptionLabel.length && imperativeLabel.length) {
                label.textContent = label.textContent + ": ";
            } else if (imperativeLabel.length && argumentKeys.length) {
                label.textContent = label.textContent + " ,";
            }

            if (argumentKeys.length) {
                this.HasLabel = true;
                var argumentsDiv = document.createElement("div");
                argumentsDiv.classList.add("genie-shortcut-ui-arguments");
                for (var i = 0; i < argumentKeys.length; i++) {
                    var argDiv = document.createElement("div");
                    argDiv.classList.add("genie-shortcut-ui-arguments-item");
                    var argSpan = document.createElement("span");
                    argSpan.classList.add("genie-shortcut-ui-arguments-span");
                    argSpan.textContent = _.upperFirst(argumentKeys[i]) + ": ";
                    var valueSpan = document.createElement("span");
                    valueSpan.classList.add("genie-shortcut-ui-value-span");
                    valueSpan.textContent = this.Command.ArgumentsMap[argumentKeys[i]];
                    argDiv.appendChild(argSpan);
                    argDiv.appendChild(valueSpan);
                    argumentsDiv.appendChild(argDiv);
                }
                command.appendChild(argumentsDiv);
            }

            this._domElement = command;
        }
    };

    $action.ShortcutsUICommandItem = ShortcutsUICommandItem;

    class ShortcutsUI extends $action.UI {
        constructor() {
            // Keep a map between the command labels and their execute() calls so that we can map audio commands to call commands
            super();
            this.init();
            this._shortcuts = {};
        }

        init() {
            var shortcutUI = document.createElement("div");
            shortcutUI.classList.add("genie-shortcut-ui");

            var header = document.createElement("div");
            header.classList.add("genie-shortcut-ui-header");

            var label = document.createElement("span");
            label.classList.add("genie-shortcut-ui-header-label");
            label.textContent = "Keyboard shortcuts";
            header.appendChild(label);

            var close = document.createElement("span");
            close.classList.add("genie-shortcut-ui-header-close");
            close.textContent = "Close";

            var self = this;
            close.addEventListener("click", function (evt) {
                self.hide();
            }, null, false, true);

            header.appendChild(close);
            shortcutUI.appendChild(header);

            var content = document.createElement("div");
            content.classList.add("genie-shortcut-ui-content");
            shortcutUI.appendChild(content);


            this.commandContainer = content;
            shortcutUI.style.display = "none";
            $('html').append(shortcutUI);
            this.Root = shortcutUI;
        };

        getUniqueShortcut(label, command) {
            if (label.length) {
                for (var i = 0; i < label.length; i++) {
                    var letter = label[i].toLowerCase();
                    if (!this._shortcuts[letter]) {
                        this._shortcuts[letter] = command;
                        return letter;
                    }
                }
            }
            
            // Assign first letter of alphabet not already used
            var alphabet = "abcdefghijklmnopqrstuvwxyz";
            for (var j = 0; j < alphabet.length; j++) {
                var alphabetLetter = alphabet[j];
                if (!this._shortcuts[alphabetLetter]) {
                    this._shortcuts[alphabetLetter] = command;
                    return alphabetLetter;
                }
            }

            return "";
        }

        createShortcuts(command, commandItem) {
            var shortcuts = [];
            if (command.hasArguments()) {
                var argumentKeys = Object.keys(command.ArgumentsMap);
                for (var i = 0; i < argumentKeys.length; i++) {
                    let argument = argumentKeys[i];
                    var argumentShortcut = this.getUniqueShortcut(argument, commandItem);
                    if (argumentShortcut.length) {
                        shortcuts.push(argumentShortcut);
                        this._keypressListener.simple_combo("ctrl " + argumentShortcut, commandItem.perform.bind(commandItem, argument));
                    }
                }
            } else {
                let label = commandItem.firstImperativeLabel();
                let shortcut = this.getUniqueShortcut(label, commandItem);
                shortcuts.push(shortcut);
                this._keypressListener.simple_combo("ctrl " + shortcut, commandItem.perform.bind(commandItem));
            }

            return shortcuts;
        }

        appendCommandGroup(label, commands) {
            if (!this._keypressListener) {
                this._keypressListener = new window.keypress.Listener();
            }

            if (label == "commands") {
                var commandGroup = document.createElement("div");
                commandGroup.classList.add("genie-shortcut-ui-group");
                var commandsContainer = document.createElement("div");
                commandsContainer.classList.add("genie-shortcut-ui-group-content");
                commandGroup.appendChild(commandsContainer);

                var shortcutsContainer = document.createElement("div");
                shortcutsContainer.classList.add("genie-shortcut-ui-group-shortcuts")
                commandGroup.appendChild(shortcutsContainer);
                for (var i = 0; i < commands.length; i++) {
                    var newCommand = new $action.ShortcutsUICommandItem(commands[i], this);
                    if (newCommand.HasLabel) {
                        var shortcuts = this.createShortcuts(commands[i], newCommand);
                        for (var j = 0; j < shortcuts.length; j++) {
                            let shortcutLabel = document.createElement("span");
                            shortcutLabel.textContent = "ctrl + " + shortcuts[j];
                            shortcutsContainer.appendChild(shortcutLabel);
                        }
                        commandsContainer.append(newCommand.DOM);
                    }
                }
                this.commandContainer.appendChild(commandGroup);
            }
        }
    };

    $action.ShortcutsUI = ShortcutsUI;
})($action);